import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [MyGateway],
  imports: [UsersModule],
})
export class GatewayModule {}
