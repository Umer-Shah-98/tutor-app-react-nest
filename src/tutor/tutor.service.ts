import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tutor } from './schemas/tutor.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class TutorService {
  constructor(
    @InjectModel(Tutor.name)
    private tutorModel: Model<Tutor>,
  ) {}

  // async create(tutor: any) {
  //   try {
  //     const { username, email, password, isTutor } = tutor;
  //     const hashedPassword = await bcrypt.hash(password, 5);
  //     const role = isTutor ? 'tutor' : 'student';
  //     if (!isTutor) {
  //       throw new BadRequestException();
  //     }
  //     const newTutor = new this.tutorModel({
  //       username,
  //       email,
  //       isTutor,
  //       password: hashedPassword,
  //     });
  //     return await this.tutorModel.create(newTutor);
  //   } catch (error) {
  //     throw new BadRequestException(
  //       'Email is already existed, try a unique one or You entered incomplete credentials.',
  //     );
  //   }
  // }
  async create(tutor: any) {
    try {
      const { username, email, password, isTutor } = tutor;
      const hashedPassword = await bcrypt.hash(password, 5);

      if (!isTutor) {
        throw new BadRequestException('Invalid role selected.');
      }

      const newTutor = new this.tutorModel({
        username,
        email,
        isTutor,
        password: hashedPassword,
      });

      // Perform additional checks here if needed, e.g., checking the balance

      return await this.tutorModel.create(newTutor);
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle validation errors from DTO

        return { error: error.message };
      } else {
        // Handle other unexpected errors
        return {
          error: 'An error occurred on the server. Please try again later.',
        };
      }
    }
  }

  async findAll() {
    const tutors = await this.tutorModel.find().exec();
    return tutors;
    // return tutors.map((tutor) => ({
    //   id: tutor.id,
    //   username: tutor.username,
    //   email: tutor.email,
    // }));
  }

  async findOne(id: string) {
    let tutor;
    try {
      tutor = await this.tutorModel.findById(id);
    } catch (error) {
      throw new NotFoundException();
    }
    if (!tutor) {
      throw new NotFoundException();
    }
    return {
      id: tutor.id,
      username: tutor.username,
      email: tutor.email,
      balance: tutor.balance,
    };
  }

  async update(id: string, tutor: UpdateTutorDto) {
    let updatedTutor;
    try {
      updatedTutor = await this.tutorModel.findByIdAndUpdate(id, tutor, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new NotFoundException();
    }
    if (!updatedTutor) {
      throw new NotFoundException();
    }
    return updatedTutor;
  }

  async remove(id: string) {
    const removedTutor = await this.tutorModel.findByIdAndRemove(id);
    return `Tutor with id: ${removedTutor.id} is removed`;
  }

  async findByEmail(email: string): Promise<Tutor | null> {
    try {
      return await this.tutorModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
