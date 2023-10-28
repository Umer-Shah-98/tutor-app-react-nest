import mongoose, { Document, Types } from 'mongoose';
import { Student } from 'src/student/schemas/student.schema';
export declare class Request extends Document {
    studentName: string;
    email: string;
    id: Types.ObjectId | Student | string;
    subject: string;
    class: string;
    details: string;
}
export declare const RequestSchema: mongoose.Schema<Request, mongoose.Model<Request, any, any, any, mongoose.Document<unknown, any, Request> & Request & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Request, mongoose.Document<unknown, {}, mongoose.FlatRecord<Request>> & mongoose.FlatRecord<Request> & {
    _id: Types.ObjectId;
}>;
