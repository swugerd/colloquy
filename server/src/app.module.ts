import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { databaseConfig } from './config/configuration';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CitiesModule } from './cities/cities.module';
import { GatewayModule } from './gateway/gateway.module';
import { FriendsModule } from './friends/friends.module';
import { PhotosModule } from './photos/photos.module';
import { ThematicsModule } from './thematics/thematics.module';
import { VideosModule } from './videos/videos.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [databaseConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'src', 'static'),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    RolesModule,
    UsersModule,
    GroupsModule,
    AuthModule,
    FilesModule,
    CitiesModule,
    GatewayModule,
    FriendsModule,
    PhotosModule,
    ThematicsModule,
    VideosModule,
    PostsModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
