import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorSchema } from './schemas/tutor.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tutor', schema: TutorSchema }]),
    JwtModule.register({
      secret: 'nestjs',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [TutorController],
  providers: [TutorService],
})
export class TutorModule {}
