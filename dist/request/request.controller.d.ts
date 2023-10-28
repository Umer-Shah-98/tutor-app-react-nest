import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
export declare class RequestController {
    private readonly requestService;
    constructor(requestService: RequestService);
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
    update(id: string, updateRequestDto: UpdateRequestDto): string;
    removeRequestOfStudent(id: string): Promise<{
        studentName: string;
        email: string;
        id: any;
        class: string;
        subject: string;
        details: string;
        requestId: any;
    }>;
    remove(id: string): Promise<{
        studentName: string;
        email: string;
        id: any;
        class: string;
        subject: string;
        details: string;
        requestId: any;
    }[]>;
}
