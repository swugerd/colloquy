import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { FriendsModule } from 'src/friends/friends.module';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([Post]), UsersModule, forwardRef(() => FriendsModule)],
  exports: [PostsService],
})
export class PostsModule {}
