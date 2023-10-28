import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Proposal } from './schemas/proposal.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name)
    private proposalModel: Model<Proposal>,
  ) {}
  async create(createProposalDto: CreateProposalDto) {
    try {
      const proposal = await this.proposalModel.create(createProposalDto);
      return proposal;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      const proposals = await this.proposalModel.find().exec();
      const pendingProposals = proposals.filter(
        (proposal) =>
          proposal.isAccepted === false && proposal.isRejected === false,
      );
      return pendingProposals.map((proposal) => {
        return {
          tutorName: proposal.tutorName,
          studentName: proposal.studentName,
          email: proposal.email,
          tutorId: proposal.tutorId,
          studentId: proposal.studentId,
          proposalText: proposal.proposalText,
          proposalId: proposal._id,
          subject: proposal.subject,
          class: proposal.class,
          isAccepted: proposal.isAccepted,
          isRejected: proposal.isRejected,
          requestId: proposal.requestId,
          monthlyFee: proposal.monthlyFee,
        };
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAllAccepted(id: string) {
    try {
      const proposals = await this.proposalModel.find().exec();
      const acceptedProposals = proposals.filter(
        (proposal) =>
          (proposal.tutorId === id || proposal.studentId === id) &&
          proposal.isAccepted === true &&
          proposal.isRejected === false,
      );
      return acceptedProposals.map((proposal) => {
        return {
          tutorName: proposal.tutorName,
          studentName: proposal.studentName,
          email: proposal.email,
          tutorId: proposal.tutorId,
          studentId: proposal.studentId,
          proposalText: proposal.proposalText,
          proposalId: proposal._id,
          subject: proposal.subject,
          class: proposal.class,
          isAccepted: proposal.isAccepted,
          isRejected: proposal.isRejected,
          monthlyFee: proposal.monthlyFee,
        };
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async findAllRejected(id: string) {
    try {
      const proposals = await this.proposalModel.find().exec();
      const acceptedProposals = proposals.filter(
        (proposal) =>
          (proposal.tutorId === id || proposal.studentId === id) &&
          proposal.isAccepted === false &&
          proposal.isRejected === true,
      );
      return acceptedProposals.map((proposal) => {
        return {
          tutorName: proposal.tutorName,
          studentName: proposal.studentName,
          email: proposal.email,
          tutorId: proposal.tutorId,
          studentId: proposal.studentId,
          proposalText: proposal.proposalText,
          proposalId: proposal._id,
          subject: proposal.subject,
          class: proposal.class,
          isAccepted: proposal.isAccepted,
          isRejected: proposal.isRejected,
          monthlyFee: proposal.monthlyFee,
        };
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async findAllAcceptedAdmin() {
    try {
      const proposals = await this.proposalModel.find().exec();

      const acceptedProposals = proposals.filter(
        (proposal) =>
          proposal.isAccepted === true && proposal.isRejected === false,
      );
      return acceptedProposals.map((proposal) => {
        return {
          tutorName: proposal.tutorName,
          studentName: proposal.studentName,
          email: proposal.email,
          tutorId: proposal.tutorId,
          studentId: proposal.studentId,
          proposalText: proposal.proposalText,
          proposalId: proposal._id,
          subject: proposal.subject,
          class: proposal.class,
          isAccepted: proposal.isAccepted,
          isRejected: proposal.isRejected,
          monthlyFee: proposal.monthlyFee,
        };
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async findAllRejectedAdmin() {
    try {
      const proposals = await this.proposalModel.find().exec();

      const acceptedProposals = proposals.filter(
        (proposal) =>
          proposal.isAccepted === false && proposal.isRejected === true,
      );
      return acceptedProposals.map((proposal) => {
        return {
          tutorName: proposal.tutorName,
          studentName: proposal.studentName,
          email: proposal.email,
          tutorId: proposal.tutorId,
          studentId: proposal.studentId,
          proposalText: proposal.proposalText,
          proposalId: proposal._id,
          subject: proposal.subject,
          class: proposal.class,
          isAccepted: proposal.isAccepted,
          isRejected: proposal.isRejected,
          monthlyFee: proposal.monthlyFee,
        };
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const proposals = await this.proposalModel.find().exec();
      const filteredProposals = proposals.filter(
        (proposal) =>
          proposal.requestId === id ||
          (proposal.studentId === id &&
            proposal.isAccepted === false &&
            proposal.isRejected === false) ||
          (proposal.tutorId === id &&
            proposal.isAccepted === false &&
            proposal.isRejected === false),
      );
      return filteredProposals.map((proposal) => {
        return {
          tutorName: proposal.tutorName,
          studentName: proposal.studentName,
          email: proposal.email,
          tutorId: proposal.tutorId,
          studentId: proposal.studentId,
          proposalText: proposal.proposalText,
          proposalId: proposal._id,
          subject: proposal.subject,
          class: proposal.class,
          isAccepted: proposal.isAccepted,
          isRejected: proposal.isRejected,
          requestId: proposal.requestId,
          monthlyFee: proposal.monthlyFee,
        };
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, updateProposalDto: UpdateProposalDto) {
    try {
      const updatedProposal = await this.proposalModel.findByIdAndUpdate(
        id,
        updateProposalDto,
        { new: true, upsert: true },
      );
      return updatedProposal;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    try {
      const removedProposal = await this.proposalModel.findByIdAndRemove(id);
      const proposals = await this.proposalModel.find().exec();
      const updatedProposals = proposals.filter(
        (proposal) =>
          proposal._id !== id &&
          proposal.isAccepted === false &&
          proposal.isRejected === false,
      );
      return updatedProposals.map((proposal) => {
        return {
          tutorName: proposal.tutorName,
          email: proposal.email,
          tutorId: proposal.tutorId,
          studentId: proposal.studentId,
          proposalText: proposal.proposalText,
          proposalId: proposal._id,
          subject: proposal.subject,
          class: proposal.class,
          isAccepted: proposal.isAccepted,
          isRejected: proposal.isRejected,
          monthlyFee: proposal.monthlyFee,
        };
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async deleteMany(query: Record<string, any>) {
    
    try {
      const result = await this.proposalModel.deleteMany(query);
      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
