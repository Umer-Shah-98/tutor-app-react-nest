import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './schemas/request.schema';
import { Model } from 'mongoose';
export declare class RequestService {
    private requestModel;
    constructor(requestModel: Model<Request>);
    create(createRequestDto: CreateRequestDto): Promise<any>;
    findAll(): Promise<{
        studentName: string;
        email: string;
        id: any;
        class: string;
        subject: string;
        details: string;
        requestId: any;
    }[]>;
    findAllRequestsForStudentId(id: string): Promise<{
        studentName: string;
        email: string;
        id: any;
        class: string;
        subject: string;
        details: string;
        requestId: any;
    }[]>;
    findOne(id: string): Promise<any>;
    update(id: number, updateRequestDto: UpdateRequestDto): string;
    remove(id: string): Promise<{
        studentName: string;
        email: string;
        id: any;
        class: string;
        subject: string;
        details: string;
        requestId: any;
    }[]>;
    removeRequestOfStudent(id: string): Promise<{
        studentName: string;
        email: string;
        id: any;
        class: string;
        subject: string;
        details: string;
        requestId: any;
    }>;
}
