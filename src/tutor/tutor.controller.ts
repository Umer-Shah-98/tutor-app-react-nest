import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import * as bcrypt from 'bcryptjs';

@Controller('tutors')
export class TutorController {
  constructor(
    private readonly tutorService: TutorService,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  @Post('/signup')
  async create(@Body() tutor: CreateTutorDto) {
    try {
      const tutorData = {
        username: tutor.username,
        email: tutor.email,
        password: tutor.password,
        isTutor: tutor.isTutor,
      };
      return this.tutorService.create(tutorData);
    } catch (error) {
      
      return error.error;
    }
  }

  @Post('/login') // Define the login route
  async login(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    const tutor = await this.tutorService.findByEmail(email);

    if (!tutor) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, tutor.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token for the authenticated tutor
    const payload = { sub: tutor.id, username: tutor.username };
    const token = this.jwtService.sign(payload);

    // Return the token and user details
    return {
      token,
      user: {
        id: tutor.id,
        username: tutor.username,
        email: tutor.email,
        isTutor: tutor.isTutor,
        balance: tutor.balance,
      },
    };
  }

  @Get()
  findAll() {
    return this.tutorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tutor: UpdateTutorDto) {
    return this.tutorService.update(id, tutor);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorService.remove(id);
  }
}
