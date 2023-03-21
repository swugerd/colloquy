import { RolesModule } from './../roles/roles.module';
import { City } from 'src/groups/models/cities.model';
import { UserRoles } from './../roles/models/user-roles.model';
import { Role } from './../roles/models/roles.model';
import { User } from './models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles, City]), RolesModule],
  exports: [UsersService],
})
export class UsersModule {}
