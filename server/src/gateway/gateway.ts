import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: '*',
})
export class MyGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly usersService: UsersService) {}

  // onModuleInit() {
  //   this.server.on('connection', (socket) => {
  //     console.log('ws init connected - ' + socket.id);

  //     socket.on('disconnect', () => {
  //       console.log('ws disconnected - ' + socket.id);
  //     });
  //   });
  // }

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
}
