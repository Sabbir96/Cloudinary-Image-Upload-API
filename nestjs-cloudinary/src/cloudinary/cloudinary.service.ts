import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  /*async getSecureUrl(publicId: string): Promise<string> {
    const result = await v2.api.resources({ public_ids: [publicId], max_results: 1 });
    if (result.resources.length === 0) {
      throw new Error('Image not found');
    }
    return result.resources[0].secure_url;
  }*/
}
