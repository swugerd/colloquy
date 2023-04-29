import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: '*',
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('ws init connected - ' + socket.id);
      socket.on('disconnect', () => {
        console.log('ws disconnected - ' + socket.id);
      });
    });
  }

  @SubscribeMessage('statusChange')
  onStatusChange(@MessageBody() body: any) {
    this.server.emit('statusChange', body);
  }
}
