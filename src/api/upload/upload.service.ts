import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
import {UploadResponse} from "@/api/upload/upload-response.entity";

@Injectable()
export class UploadService {
  public async upload(file: any): Promise<UploadResponse> {
    if (!UploadService.isImage(file.originalname)) {
      throw new Error('File is not an image');
    }

    const uploadFolder = path.resolve(__dirname, '../../../../src/assets/uploads');

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    const newImageName = uuidv4();
    const fileExtension = path.extname(file.originalname);
    const newFileName = newImageName + fileExtension;
    const filePath = path.resolve(uploadFolder, newFileName);

    fs.writeFileSync(filePath, file.buffer);

    console.log('Upload success');

    return {filename: newFileName};
  }

  private static isImage(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
  }

  public getImagePath(name: string): string {
    const uploadFolder = path.resolve(__dirname, '../../../../src/assets/uploads');
    const filePath = path.resolve(uploadFolder, name);

    if (!fs.existsSync(filePath)) {
      throw new Error('Image not found');
    }

    return filePath;
  }
}

