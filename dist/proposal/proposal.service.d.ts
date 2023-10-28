/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Proposal } from './schemas/proposal.schema';
import { Model } from 'mongoose';
export declare class ProposalService {
    private proposalModel;
    constructor(proposalModel: Model<Proposal>);
    create(createProposalDto: CreateProposalDto): Promise<import("mongoose").Document<unknown, {}, Proposal> & Proposal & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<{
        tutorName: string;
        studentName: string;
        email: string;
        tutorId: string;
        studentId: string;
        proposalText: string;
        proposalId: any;
        subject: string;
        class: string;
        isAccepted: boolean;
        isRejected: boolean;
        requestId: string;
        monthlyFee: number;
    }[]>;
    findAllAccepted(id: string): Promise<{
        tutorName: string;
        studentName: string;
        email: string;
        tutorId: string;
        studentId: string;
        proposalText: string;
        proposalId: any;
        subject: string;
        class: string;
        isAccepted: boolean;
        isRejected: boolean;
        monthlyFee: number;
    }[]>;
    findAllRejected(id: string): Promise<{
        tutorName: string;
        studentName: string;
        email: string;
        tutorId: string;
        studentId: string;
        proposalText: string;
        proposalId: any;
        subject: string;
        class: string;
        isAccepted: boolean;
        isRejected: boolean;
        monthlyFee: number;
    }[]>;
    findAllAcceptedAdmin(): Promise<{
        tutorName: string;
        studentName: string;
        email: string;
        tutorId: string;
        studentId: string;
        proposalText: string;
        proposalId: any;
        subject: string;
        class: string;
        isAccepted: boolean;
        isRejected: boolean;
        monthlyFee: number;
    }[]>;
    findAllRejectedAdmin(): Promise<{
        tutorName: string;
        studentName: string;
        email: string;
        tutorId: string;
        studentId: string;
        proposalText: string;
        proposalId: any;
        subject: string;
        class: string;
        isAccepted: boolean;
        isRejected: boolean;
        monthlyFee: number;
    }[]>;
    findOne(id: string): Promise<{
        tutorName: string;
        studentName: string;
        email: string;
        tutorId: string;
        studentId: string;
        proposalText: string;
        proposalId: any;
        subject: string;
        class: string;
        isAccepted: boolean;
        isRejected: boolean;
        requestId: string;
        monthlyFee: number;
    }[]>;
    update(id: string, updateProposalDto: UpdateProposalDto): Promise<import("mongoose").Document<unknown, {}, Proposal> & Proposal & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{
        tutorName: string;
        email: string;
        tutorId: string;
        studentId: string;
        proposalText: string;
        proposalId: any;
        subject: string;
        class: string;
        isAccepted: boolean;
        isRejected: boolean;
        monthlyFee: number;
    }[]>;
    deleteMany(query: Record<string, any>): Promise<import("mongodb").DeleteResult>;
}
