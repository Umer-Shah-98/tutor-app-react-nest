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
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './schemas/tutor.schema';
import { Model } from 'mongoose';
export declare class TutorService {
    private tutorModel;
    constructor(tutorModel: Model<Tutor>);
    create(tutor: any): Promise<(import("mongoose").Document<unknown, {}, Tutor> & Tutor & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        error: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Tutor> & Tutor & {
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
    findByEmail(email: string): Promise<Tutor | null>;
}
