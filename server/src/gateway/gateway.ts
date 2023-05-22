import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: '*',
})
export class MyGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  @SubscribeMessage('statusChange')
  onStatusChange(
    @MessageBody()
    body: {
      id: number;
      online_type: 'pc-online' | 'pc-dnd' | 'pc-afk' | 'pc-offline';
    },
  ) {
    this.usersService.updateUserById(body.id, body);

    this.server.emit('statusChange', body);
  }

  @SubscribeMessage('joinRoom')
  onJoinRoom(@MessageBody() chatId: number, @ConnectedSocket() socket: Socket) {
    socket.join(chatId.toString());
  }

  @SubscribeMessage('leaveRoom')
  onLeaveRoom(@MessageBody() chatId: number, @ConnectedSocket() socket: Socket) {
    socket.leave(chatId.toString());
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(
    @MessageBody()
    body: {
      id: number;
      message_text: string;
      currentUserId: number;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    const createdMessage = await this.messagesService.createMessage(body.id, {
      message_text: body.message_text,
      currentUserId: body.currentUserId,
    });

    this.server.to(body.currentUserId.toString()).emit('sendMessage', createdMessage);
    socket.emit('sendMessage', createdMessage);
  }
}
