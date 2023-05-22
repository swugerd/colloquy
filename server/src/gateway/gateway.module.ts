import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { UsersModule } from 'src/users/users.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  providers: [MyGateway],
  imports: [UsersModule, MessagesModule],
})
export class GatewayModule {}
