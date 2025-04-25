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
import { BoardService } from './board.service';
import { UpdateCellDto } from './dto/cell.dto';
import { Logger } from '@nestjs/common';
import { SessionsService } from 'src/sessions/sessions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
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
    private readonly prismaService: PrismaService,
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

    const user = await this.prismaService.user.findUnique({
      where: { id: userSession.id },
    });

    if (!user) {
      throw new WsException('User not found');
    }

    const { x, y, color } = data;

    if (user.cellsAvailable > 0) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { cellsAvailable: user.cellsAvailable - 1 },
      });
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
      cookies.split(';').map(cookie => {
        const [key, value] = cookie.trim().split('=');
        return [key, decodeURIComponent(value)];
      }),
    );

    return parsedCookies['session_token'] || null;
  }
}
