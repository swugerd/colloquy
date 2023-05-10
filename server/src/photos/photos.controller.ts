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
import { PhotosService } from './photos.service';
import { PhotoDto } from './dto/photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile as FileToUpload } from 'src/files/files.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo_url'))
  uploadPhotoById(@Body() dto: PhotoDto, @UploadedFile() photo: FileToUpload) {
    return this.photosService.uploadPhoto(dto, photo);
  }

  @Get('/:id')
  getPhotosById(@Param('id') id: number, @Query('type') type: 'user' | 'group') {
    return this.photosService.getAllById(id, type);
  }

  @Delete('/:id')
  removePhotoById(@Param('id') photoId: number) {
    return this.photosService.removePhoto(photoId);
  }
}
