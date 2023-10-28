// import { Module } from '@nestjs/common';
// import { StudentService } from './student.service';
// import { StudentController } from './student.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { StudentSchema } from './schemas/student.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
//   ],
//   controllers: [StudentController],
//   providers: [StudentService],
// })
// export class StudentModule {}
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    JwtModule.register({
      secret: 'nestjs',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService], // Export StudentService if needed in other modules
})
export class StudentModule {}
