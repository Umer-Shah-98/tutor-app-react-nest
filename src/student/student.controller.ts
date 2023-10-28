import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Body,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import * as bcrypt from 'bcryptjs';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  @Post('/signup')
  create(@Body() student: CreateStudentDto) {
    const studentData = {
      username: student.username,
      email: student.email,
      password: student.password,
      isStudent: student.isStudent,
    };
    return this.studentService.create(studentData);
  }

  @Post('/login') // Define the login route
  async login(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    const student = await this.studentService.findByEmail(email);

    if (!student) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token for the authenticated student
    const payload = { sub: student.id, username: student.username };
    const token = this.jwtService.sign(payload);

    // Return the token and user details
    return {
      token,
      user: {
        id: student.id,
        username: student.username,
        email: student.email,
        isStudent: student.isStudent,
      },
    };
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() student: UpdateStudentDto) {
    return this.studentService.update(id, student);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
