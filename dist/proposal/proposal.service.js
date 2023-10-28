"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const proposal_schema_1 = require("./schemas/proposal.schema");
const mongoose_2 = require("mongoose");
let ProposalService = class ProposalService {
    constructor(proposalModel) {
        this.proposalModel = proposalModel;
    }
    async create(createProposalDto) {
        try {
            const proposal = await this.proposalModel.create(createProposalDto);
            return proposal;
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAll() {
        try {
            const proposals = await this.proposalModel.find().exec();
            const pendingProposals = proposals.filter((proposal) => proposal.isAccepted === false && proposal.isRejected === false);
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
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAllAccepted(id) {
        try {
            const proposals = await this.proposalModel.find().exec();
            const acceptedProposals = proposals.filter((proposal) => (proposal.tutorId === id || proposal.studentId === id) &&
                proposal.isAccepted === true &&
                proposal.isRejected === false);
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
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAllRejected(id) {
        try {
            const proposals = await this.proposalModel.find().exec();
            const acceptedProposals = proposals.filter((proposal) => (proposal.tutorId === id || proposal.studentId === id) &&
                proposal.isAccepted === false &&
                proposal.isRejected === true);
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
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAllAcceptedAdmin() {
        try {
            const proposals = await this.proposalModel.find().exec();
            const acceptedProposals = proposals.filter((proposal) => proposal.isAccepted === true && proposal.isRejected === false);
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
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAllRejectedAdmin() {
        try {
            const proposals = await this.proposalModel.find().exec();
            const acceptedProposals = proposals.filter((proposal) => proposal.isAccepted === false && proposal.isRejected === true);
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
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findOne(id) {
        try {
            const proposals = await this.proposalModel.find().exec();
            const filteredProposals = proposals.filter((proposal) => proposal.requestId === id ||
                (proposal.studentId === id &&
                    proposal.isAccepted === false &&
                    proposal.isRejected === false) ||
                (proposal.tutorId === id &&
                    proposal.isAccepted === false &&
                    proposal.isRejected === false));
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
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async update(id, updateProposalDto) {
        try {
            const updatedProposal = await this.proposalModel.findByIdAndUpdate(id, updateProposalDto, { new: true, upsert: true });
            return updatedProposal;
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
    async remove(id) {
        try {
            const removedProposal = await this.proposalModel.findByIdAndRemove(id);
            const proposals = await this.proposalModel.find().exec();
            const updatedProposals = proposals.filter((proposal) => proposal._id !== id &&
                proposal.isAccepted === false &&
                proposal.isRejected === false);
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
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
    async deleteMany(query) {
        try {
            const result = await this.proposalModel.deleteMany(query);
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(proposal_schema_1.Proposal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProposalService);
//# sourceMappingURL=proposal.service.js.map