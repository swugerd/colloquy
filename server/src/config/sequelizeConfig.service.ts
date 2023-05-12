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
import { Group } from 'src/groups/models/group.model';
import { Thematic } from 'src/thematics/models/thematics.model';
import { Photo } from 'src/photos/models/photos.model';
import { Video } from 'src/videos/models/video.model';
import { GroupMember } from 'src/groups/models/group-members.model';
import { Blacklist } from 'src/groups/models/blacklist.model';
import { GroupRequest } from 'src/groups/models/group-requests.model';
import { GroupSuggest } from 'src/groups/models/group-suggest.model';
import { Post } from 'src/posts/models/post.model';

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
      models: [
        User,
        City,
        Thematic,
        Role,
        UserRoles,
        Friends,
        FriendsRequests,
        Group,
        Photo,
        Video,
        GroupMember,
        Blacklist,
        GroupRequest,
        GroupSuggest,
        Post,
      ],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
