import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import * as mime from 'mime-types';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { Group } from 'src/groups/models/group.model';

export interface UploadedFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(Group) private readonly groupRepository: typeof Group,
  ) {}

  async createFile(
    file: UploadedFile,
    userId?: number,
    isVideo?: boolean,
    groupId?: number,
  ): Promise<string> {
    const allowedMimeTypes = isVideo ? ['video/mp4'] : ['image/jpeg', 'image/png', 'image/jpg'];
    const fileMimeType = mime.lookup(file.originalname);
    if (fileMimeType && !allowedMimeTypes.includes(fileMimeType)) {
      throw new BadRequestException('Недопустимый формат файла');
    }

    const fileExtenstion = path.extname(file.originalname);
    const fileName = `${uuid.v4()}${fileExtenstion}`;
    const filePath = path.resolve(__dirname, '..', '..', 'src', 'static');

    try {
      await fs.promises.mkdir(filePath, { recursive: true });
      const writeStream = fs.createWriteStream(path.join(filePath, fileName));
      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', () => {
          resolve();
        });
        writeStream.on('error', (error) => {
          reject(error);
        });
        writeStream.write(file.buffer);
        writeStream.end();
      });
      if (userId || groupId) {
        await fs.promises.unlink(
          path.join(
            filePath,
            userId
              ? (
                  await this.userRepository.findByPk(userId)
                ).user_avatar
              : (
                  await this.groupRepository.findByPk(groupId)
                ).group_avatar,
          ),
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(`Ошибка записи файла: ${error.message}`);
    }

    return fileName;
  }

  async deleteFile(fileName: string) {
    const filePath = path.resolve(__dirname, '..', '..', 'src', 'static');

    const deletedFile = await fs.promises.unlink(path.join(filePath, fileName));

    return deletedFile;
  }
}
