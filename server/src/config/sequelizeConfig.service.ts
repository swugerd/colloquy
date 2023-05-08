import { UserRoles } from './../roles/models/user-roles.model';
import { Role } from './../roles/models/roles.model';
import { City } from 'src/cities/models/cities.model';
import { User } from '../users/models/users.model';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';
import { EnumConfig } from './enumConfig/enumConfig';
import { Injectable } from '@nestjs/common';
import { Friends } from 'src/friends/models/friends.model';
import { FriendsRequests } from 'src/friends/models/friend-requests.model';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configSevice: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const {
      pg: { dialect, logging, host, port, username, password, database },
    } = this.configSevice.get(EnumConfig.DATABASE);

    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [User, City, Role, UserRoles, Friends, FriendsRequests],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
