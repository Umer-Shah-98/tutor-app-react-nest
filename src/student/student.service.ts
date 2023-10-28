import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schemas/student.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
  ) {}

  // async create(student: any) {
  //   try {
  //     const { username, email, password, isStudent } = student;
  //     const hashedPassword = await bcrypt.hash(password, 5);
  //     const role = isStudent ? 'student' : 'tutor';
  //     if (!isStudent) {
  //       throw new BadRequestException();
  //     } // Set the role based on isStudent
  //     const newStudent = new this.studentModel({
  //       username,
  //       email,
  //       isStudent,
  //       password: hashedPassword,
  //     });
  //     return await this.studentModel.create(newStudent);
  //   } catch (error) {
  //     throw new BadRequestException(
  //       'Email is already existed, try a unique one.',
  //     );
  //   }
  // }
  async create(student: any) {
    try {
      const { username, email, password, isStudent } = student;
      const hashedPassword = await bcrypt.hash(password, 5);
      const role = isStudent ? 'student' : 'tutor';
      if (!isStudent) {
        throw new BadRequestException('Invalid role selected.');
      }
      const newStudent = new this.studentModel({
        username,
        email,
        isStudent,
        password: hashedPassword,
      });
      return await this.studentModel.create(newStudent);
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle validation or business logic errors
        return { error: error.message };
      } else if (error instanceof Error) {
        // Handle other unexpected errors
        return {
          error: 'An error occurred on the server. Please try again later.',
        };
      }
    }
  }

  async findAll() {
    const students = await this.studentModel.find().exec();
    return students.map((student) => ({
      id: student.id,
      username: student.username,
      email: student.email,
    }));
  }

  async findOne(id: string) {
    let student;
    try {
      student = await this.studentModel.findById(id);
    } catch (error) {
      throw new NotFoundException();
    }
    if (!student) {
      throw new NotFoundException();
    }
    return {
      id: student.id,
      username: student.username,
      email: student.email,
    };
  }

  async update(id: string, student: UpdateStudentDto) {
    let updatedStudent;
    try {
      updatedStudent = await this.studentModel.findByIdAndUpdate(id, student, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new NotFoundException();
    }
    if (!updatedStudent) {
      throw new NotFoundException();
    }
    return updatedStudent;
  }

  async remove(id: string) {
    const removedStudent = await this.studentModel.findByIdAndRemove(id);
    return `Student with id: ${removedStudent.id} is removed`;
  }

  async findByEmail(email: string): Promise<Student | null> {
    try {
      return await this.studentModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
