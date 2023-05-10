import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from './models/video.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [SequelizeModule.forFeature([Video]), FilesModule],
})
export class VideosModule {}
