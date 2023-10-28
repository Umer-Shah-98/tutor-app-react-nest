import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('/create')
  async create(@Body() createRequestDto: CreateRequestDto) {
    try {
      return this.requestService.create(createRequestDto);
    } catch (error) {
      return error;
    }
  }

  @Get('/find_all')
  findAll() {
    return this.requestService.findAll();
  }

  @Get('student/:id')
  async findAllRequestsForStudentId(@Param('id') id: string) {
    try {
      return await this.requestService.findAllRequestsForStudentId(id);
    } catch (error) {}
  }
  @Get('request/:id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(+id, updateRequestDto);
  }

  @Delete('/student/:id')
  async removeRequestOfStudent(@Param('id') id: string) {
    try {
      return this.requestService.removeRequestOfStudent(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.requestService.remove(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
