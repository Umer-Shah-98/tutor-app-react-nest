import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TutorModule } from './tutor/tutor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { RequestModule } from './request/request.module';
import { ProposalModule } from './proposal/proposal.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      cache: true,
      isGlobal: true,
    }),

    // MongooseModule.forRoot(
    //   'mongodb+srv://umershah:tutorapp@cluster0.wwfj4y1.mongodb.net/tutor-app?retryWrites=true&w=majority',
    // ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'), // Use the environment variable from .env
      }),
      inject: [ConfigService],
    }),
    StudentModule,
    TutorModule,
    JwtModule.register({
      secret: 'nestreactjs', // Replace with your secret key
      signOptions: { expiresIn: '2h' }, // Set the token expiration time as needed
    }),
    AuthModule,
    RequestModule,
    ProposalModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
