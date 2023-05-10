import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photos.model';
import { PhotoDto } from './dto/photo.dto';
import { FilesService, UploadedFile } from 'src/files/files.service';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo) private readonly photosRepository: typeof Photo,
    private readonly filesService: FilesService,
  ) {}

  async uploadPhoto({ user_id, group_id }: PhotoDto, photo: UploadedFile) {
    const fileName = await this.filesService.createFile(photo);

    const uploadDto = user_id
      ? { user_id, photo_url: fileName }
      : { group_id, photo_url: fileName };

    const uploadedPhoto = this.photosRepository.create(uploadDto);
    return uploadedPhoto;
  }

  async removePhoto(id: number) {
    const photo = await this.photosRepository.findOne({
      where: { id },
    });

    photo && (await this.filesService.deleteFile(photo.photo_url));

    return await photo?.destroy();
  }

  async getAllById(id: number, type: 'user' | 'group') {
    const photos = await this.photosRepository.findAll({
      where: { [`${type}_id`]: id },
      include: { all: true },
    });
    return photos;
  }
}
