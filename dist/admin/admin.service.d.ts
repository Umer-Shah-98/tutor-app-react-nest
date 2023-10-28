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
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
export declare class AdminService {
    private adminModel;
    constructor(adminModel: Model<Admin>);
    create(admin: any): Promise<import("mongoose").Document<unknown, {}, Admin> & Admin & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<{
        id: any;
        username: string;
        email: string;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        username: any;
        email: any;
    }>;
    update(id: string, admin: UpdateAdminDto): Promise<any>;
    remove(id: string): Promise<string>;
    findByEmail(email: string): Promise<Admin | null>;
}
