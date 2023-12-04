import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ secure_url: string }> {
    const uploadResult = await this.appService.uploadImageToCloudinary(file);
    return { secure_url: uploadResult.secure_url };
  }
}
