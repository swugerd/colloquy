import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { Injectable, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import * as mime from 'mime-types';

export interface UploadedFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

@Injectable()
export class FilesService {
  async createFile(file: UploadedFile): Promise<string> {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const fileMimeType = mime.lookup(file.originalname);
    if (fileMimeType && !allowedMimeTypes.includes(fileMimeType)) {
      throw new BadRequestException('Недопустимый формат файла');
    }

    const fileExtenstion = path.extname(file.originalname);
    const fileName = `${uuid.v4()}${fileExtenstion}`;
    const filePath = path.resolve(__dirname, '..', 'static');

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
    } catch (error) {
      throw new InternalServerErrorException(`Ошибка записи файла: ${error.message}`);
    }

    return fileName;
  }
}
