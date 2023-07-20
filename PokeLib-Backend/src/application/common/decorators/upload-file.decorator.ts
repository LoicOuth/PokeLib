import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';

export const UploadFile = (name: string, destination = './uploads/images') =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(
      FileInterceptor(name, {
        storage: diskStorage({
          destination: destination,
          filename: (_, file, callback) => {
            callback(null, `${new Date().getTime()}-${file.originalname}`);
          },
        }),
      }),
    ),
    ApiBody({
      required: true,
      type: 'multipart/form-data',
      schema: {
        type: 'object',
        properties: {
          avatar: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
