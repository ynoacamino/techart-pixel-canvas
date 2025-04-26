import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SessionsService } from '@/sessions/sessions.service';
import { User } from '@prisma/client';
import { UsersService } from '@/users/users.service';
import configuration, { CELLS_AVAILABLE, UPCOMING_CELLS_TIME_OUT } from '@/config/configuration';
import { UpdateCellDto } from './dto/cell.dto';
import { BoardService } from './board.service';

@WebSocketGateway({
  cors: {
    origin: configuration().frontendUrl,
    credentials: true,
  },
})
export class BoardGateway implements OnGatewayConnection {
  private logger: Logger = new Logger('EventsGateway');

  @WebSocketServer()
    server: Server;

  constructor(
    private readonly boardService: BoardService,
    private readonly sessionsService: SessionsService,
    private readonly userService: UsersService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const token = this.extractTokenFromHandshake(client);
    if (!token) {
      client.disconnect(true);
      return;
    }

    const user = await this.sessionsService.getUserBySessionToken(token);
    if (!user) {
      client.disconnect(true);
      return;
    }

    client.data.user = user;
    this.logger.log(`Client connected: ${user.email}`);
  }

  @SubscribeMessage('cell_clicked')
  async handleCellClick(
  @ConnectedSocket() client: Socket,
    @MessageBody() data: UpdateCellDto,
  ) {
    const userSession = client.data.user as User | null;
    if (!userSession) {
      throw new WsException('User not authenticated');
    }

    const user = await this.userService.findById(userSession.id);

    if (!user) {
      throw new WsException('User not found');
    }

    const { x, y, color } = data;

    if (user.cellsAvailable > 0) {
      if (user.upcomingCellsAt.getTime() < Date.now()) {
        const cellsAvailable = user.cellsAvailable - 1;
        const upcomingCellsAt = new Date(Date.now() + UPCOMING_CELLS_TIME_OUT);

        await this.userService.updateUser(user.id, {
          cellsAvailable,
          upcomingCellsAt,
          claimed: false,
        });

        client.emit("user_state", {
          cellsAvailable,
          claimed: false,
          upcomingCellsAt,
        });

        setTimeout(async () => {
          await this.userService.updateUser(user.id, {
            cellsAvailable: CELLS_AVAILABLE,
            claimed: true,
          });

          client.emit("user_state", {
            cellsAvailable: CELLS_AVAILABLE,
            claimed: true,
            upcomingCellsAt: user.upcomingCellsAt,
          })
        }, UPCOMING_CELLS_TIME_OUT);
      } else {
        const cellsAvailable = user.cellsAvailable - 1;

        await this.userService.updateUser(user.id, {
          cellsAvailable: cellsAvailable,
        });

        client.emit("user_state", {
          cellsAvailable,
          claimed: user.claimed,
          upcomingCellsAt: user.upcomingCellsAt,
        });
      }
    } else {
      return;
    }

    this.boardService.updateCell(x, y, color);
    this.server.emit('cell_updated', { x, y, color });
  }

  private extractTokenFromHandshake(client: Socket): string | null {
    const cookies = client.handshake.headers.cookie;

    if (!cookies) return null;

    const parsedCookies = Object.fromEntries(
      cookies.split(';').map((cookie) => {
        const [key, value] = cookie.trim().split('=');
        return [key, decodeURIComponent(value)];
      }),
    );

    return parsedCookies.session_token || null;
  }
}
