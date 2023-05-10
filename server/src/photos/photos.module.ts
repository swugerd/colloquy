import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/photos.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [SequelizeModule.forFeature([Photo]), FilesModule],
})
export class PhotosModule {}
