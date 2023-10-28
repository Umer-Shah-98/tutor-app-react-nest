import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from './schemas/request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
