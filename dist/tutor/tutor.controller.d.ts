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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { JwtService } from '@nestjs/jwt';
export declare class TutorController {
    private readonly tutorService;
    private readonly jwtService;
    constructor(tutorService: TutorService, jwtService: JwtService);
    create(tutor: CreateTutorDto): Promise<any>;
    login(loginData: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: any;
            username: string;
            email: string;
            isTutor: boolean;
            balance: number;
        };
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/tutor.schema").Tutor> & import("./schemas/tutor.schema").Tutor & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<{
        id: any;
        username: any;
        email: any;
        balance: any;
    }>;
    update(id: string, tutor: UpdateTutorDto): Promise<any>;
    remove(id: string): Promise<string>;
}
