import {
  Controller, Get, HttpStatus,
  Inject, Param,
  Post, Res, UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import { Response } from 'express';
import {UploadResponse} from "@/api/upload/upload-response.entity";

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  @Inject(UploadService)
  private readonly service: UploadService;

  @Get(':name')
  async getImage(@Param('name') name: string, @Res() res: Response): Promise<void> {
    const imagePath = this.service.getImagePath(name);

    res.sendFile(imagePath, (err) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  private async upload(@UploadedFile() image: any): Promise<UploadResponse> {
    return this.service.upload(image);
  }
}
