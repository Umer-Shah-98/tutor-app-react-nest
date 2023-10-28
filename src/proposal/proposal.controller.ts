
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get('/final')
  async findAllAcceptedAdmin() {
    try {
      const proposals = await this.proposalService.findAllAcceptedAdmin();
      return proposals;
    } catch (error) {
      throw error;
    }
  }
  @Get('/rejected/admin')
  async findAllRejectedAdmin() {
    try {
      const proposals = await this.proposalService.findAllRejectedAdmin();
      return proposals;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proposalService.findOne(id);
  }

  @Get('accepted/:id') // Change the route to avoid conflicts
  findAllAccepted(@Param('id') id: string) {
    return this.proposalService.findAllAccepted(id);
  }
  @Get('rejected/:id') // Change the route to avoid conflicts
  findAllRejected(@Param('id') id: string) {
    return this.proposalService.findAllRejected(id);
  }

  @Get()
  findAll() {
    return this.proposalService.findAll();
  }

  @Post('/create')
  async create(@Body() createProposalDto: CreateProposalDto) {
    try {
      return this.proposalService.create(createProposalDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto,
  ) {
    try {
      return this.proposalService.update(id, updateProposalDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }
  @Delete('/deleteAllProposals')
  async deleteProposals(@Body() query: Record<string, any>) {
   if (!query || Object.keys(query).length === 0) {
      throw new BadRequestException('Invalid query');
    }

    const result = await this.proposalService.deleteMany(query);
    if (result.deletedCount > 0) {
      return { message: 'Proposals deleted successfully' };
    } else {
      return { message: 'No matching proposals found for deletion' };
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.proposalService.remove(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
