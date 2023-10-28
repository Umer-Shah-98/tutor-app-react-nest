import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,
  ) {}
  async create(admin: any) {
    try {
      const { username, email, password, isAdmin } = admin;
      const hashedPassword = await bcrypt.hash(password, 5);
      const role = 'admin';
      if (!isAdmin) {
        throw new BadRequestException();
      }
      const newAdmin = new this.adminModel({
        username,
        email,
        isAdmin,
        password: hashedPassword,
        role,
      });
      return await this.adminModel.create(newAdmin);
    } catch (error) {
      throw new BadRequestException(
        'Email is already existed, try a unique one or You entered incomplete credentials.',
      );
    }
  }

  async findAll() {
    const admins = await this.adminModel.find().exec();
    return admins.map((admin) => ({
      id: admin.id,
      username: admin.username,
      email: admin.email,
    }));
  }

  async findOne(id: string) {
    let admin;
    try {
      admin = await this.adminModel.findById(id);
    } catch (error) {
      throw new NotFoundException();
    }
    if (!admin) {
      throw new NotFoundException();
    }
    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
    };
  }

  async update(id: string, admin: UpdateAdminDto) {
    let updatedAdmin;
    try {
      updatedAdmin = await this.adminModel.findByIdAndUpdate(id, admin, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new NotFoundException();
    }
    if (!updatedAdmin) {
      throw new NotFoundException();
    }
    return updatedAdmin;
  }

  async remove(id: string) {
    const removedAdmin = await this.adminModel.findByIdAndRemove(id);
    return `Tutor with id: ${removedAdmin.id} is removed`;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    try {
      return await this.adminModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
