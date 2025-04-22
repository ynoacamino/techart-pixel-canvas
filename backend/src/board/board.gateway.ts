import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BoardService } from './board.service';
import { UpdateCellDto } from './dto/cell.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BoardGateway implements OnGatewayConnection {
  @WebSocketServer()
    server: Server;

  constructor(private readonly boardService: BoardService) {}

  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
    // client.emit('board_init', this.boardService.getBoard());
  }

  @SubscribeMessage('cell_clicked')
  handleCellClick(@MessageBody() data: UpdateCellDto) {
    const { x, y, color } = data;
    this.boardService.updateCell(x, y, color);
    this.server.emit('cell_updated', { x, y, color });
  }
}
