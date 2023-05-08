import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { Friends } from './models/friends.model';
import { FriendsRequests } from './models/friend-requests.model';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
  imports: [SequelizeModule.forFeature([Friends, User, FriendsRequests])],
  exports: [FriendsService],
})
export class FriendsModule {}
