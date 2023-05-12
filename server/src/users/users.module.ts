import { FilesModule } from './../files/files.module';
import { RolesModule } from './../roles/roles.module';
import { City } from 'src/cities/models/cities.model';
import { UserRoles } from './../roles/models/user-roles.model';
import { Role } from './../roles/models/roles.model';
import { User } from './models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module, forwardRef } from '@nestjs/common';
import { FriendsModule } from 'src/friends/friends.module';
import { FriendsRequests } from 'src/friends/models/friend-requests.model';
import { Blacklist } from 'src/groups/models/blacklist.model';
import { Friends } from 'src/friends/models/friends.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, City, FriendsRequests, Blacklist, Friends]),
    RolesModule,
    FilesModule,
    forwardRef(() => FriendsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
