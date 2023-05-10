import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Video } from './models/video.model';
import { FilesService, UploadedFile } from 'src/files/files.service';
import { VideoDto } from './dto/video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video) private readonly videosRepository: typeof Video,
    private readonly filesService: FilesService,
  ) {}

  async uploadVideo({ user_id, group_id, video_name }: VideoDto, video: UploadedFile) {
    const fileName = await this.filesService.createFile(video, 0, true);

    const uploadDto = user_id
      ? { user_id, video_url: fileName, video_name }
      : { group_id, video_url: fileName, video_name };

    const uploadedPhoto = this.videosRepository.create(uploadDto);
    return uploadedPhoto;
  }

  async removeVideo(id: number) {
    const video = await this.videosRepository.findOne({
      where: { id },
    });

    video && (await this.filesService.deleteFile(video.video_url));

    return await video?.destroy();
  }

  async getAllById(id: number, type: 'user' | 'group') {
    const photos = await this.videosRepository.findAll({
      where: { [`${type}_id`]: id },
      include: { all: true },
    });
    return photos;
  }
}
