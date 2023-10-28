import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './schemas/request.schema';
import { Model } from 'mongoose';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name)
    private requestModel: Model<Request>,
  ) {}
  async create(createRequestDto: CreateRequestDto) {
    try {
      const request = await this.requestModel.create(createRequestDto);
      if (request) {
        return {
          studentName: request.studentName,
          email: request.email,
          id: request.id,
          class: request.class,
          subject: request.subject,
          details: request.details,
          requestId: request._id,
        };
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const requests = await this.requestModel.find().exec();
      // return requests;
      return requests.map((request) => {
        return {
          studentName: request.studentName,
          email: request.email,
          id: request.id,
          class: request.class,
          subject: request.subject,
          details: request.details,
          requestId: request._id,
        };
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAllRequestsForStudentId(id: string) {
    try {
      const requests = await this.requestModel.find().exec();

      const filteredRequests = requests.filter(
        (request) => request.id.toString() === id,
      );

      return filteredRequests.map((request) => {
        return {
          studentName: request.studentName,
          email: request.email,
          id: request.id,
          class: request.class,
          subject: request.subject,
          details: request.details,
          requestId: request._id,
        };
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async findOne(id: string) {
    try {
      const request = await this.requestModel.findById(id).populate('id');
      return request;
    } catch (error) {
      return error;
    }
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  async remove(id: string) {
    try {
      const removedRequest = await this.requestModel.findByIdAndRemove(id);
      const requests = await this.requestModel.find().exec();
      return requests.map((request) => {
        return {
          studentName: request.studentName,
          email: request.email,
          id: request.id,
          class: request.class,
          subject: request.subject,
          details: request.details,
          requestId: request._id,
        };
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async removeRequestOfStudent(id: string) {
    try {
      const removedRequest = await this.requestModel.findByIdAndRemove(id);

      return {
        studentName: removedRequest.studentName,
        email: removedRequest.email,
        id: removedRequest.id,
        class: removedRequest.class,
        subject: removedRequest.subject,
        details: removedRequest.details,
        requestId: removedRequest._id,
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
