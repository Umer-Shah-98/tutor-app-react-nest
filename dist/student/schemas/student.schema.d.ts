import mongoose, { Document } from 'mongoose';
export declare class Student extends Document {
    username: string;
    email: string;
    password: string;
    isStudent: boolean;
    role: string;
}
export declare const StudentSchema: mongoose.Schema<Student, mongoose.Model<Student, any, any, any, mongoose.Document<unknown, any, Student> & Student & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Student, mongoose.Document<unknown, {}, mongoose.FlatRecord<Student>> & mongoose.FlatRecord<Student> & {
    _id: mongoose.Types.ObjectId;
}>;
