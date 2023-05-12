import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { GroupMember } from './models/group-members.model';
import { FilesModule } from 'src/files/files.module';
import { Blacklist } from './models/blacklist.model';
import { GroupRequest } from './models/group-requests.model';
import { GroupSuggest } from './models/group-suggest.model';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([Group, GroupMember, Blacklist, GroupRequest, GroupSuggest]),
    FilesModule,
    PostsModule,
  ],
})
export class GroupsModule {}
