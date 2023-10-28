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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Controller('admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  create(@Body() admin: CreateAdminDto) {
    const adminData = {
      username: admin.username,
      email: admin.email,
      password: admin.password,
      isAdmin: admin.isAdmin,
    };
    return this.adminService.create(adminData);
  }

  @Post('/login') // Define the login route
  async login(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    const admin = await this.adminService.findByEmail(email);

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token for the authenticated admin
    const payload = { sub: admin.id, username: admin.username };
    const token = this.jwtService.sign(payload);

    // Return the token and user details
    return {
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        isAdmin: admin.isAdmin,
      },
    };
  }
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
