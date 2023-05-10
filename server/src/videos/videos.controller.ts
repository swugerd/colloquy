import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoDto } from './dto/video.dto';
import { UploadedFile as FileToUpload } from 'src/files/files.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video_url'))
  uploadPhotoById(@Body() dto: VideoDto, @UploadedFile() photo: FileToUpload) {
    return this.videosService.uploadVideo(dto, photo);
  }

  @Get('/:id')
  getPhotosById(@Param('id') id: number, @Query('type') type: 'user' | 'group') {
    return this.videosService.getAllById(id, type);
  }

  @Delete('/:id')
  removePhotoById(@Param('id') photoId: number) {
    return this.videosService.removeVideo(photoId);
  }
}
