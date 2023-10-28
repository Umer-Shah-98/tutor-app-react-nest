import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Student } from 'src/student/schemas/student.schema';
@Schema({
  timestamps: true,
})
export class Request extends Document {
  @Prop({ required: true })
  studentName: string;

  @Prop({
    required: true,
  })
  email: string;

  // @Prop({ required: true })
  // id: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Student.name,
    required: true,
  })
  id: Types.ObjectId | Student|string;
  @Prop({ required: true })
  subject: string;

  @Prop({
    required: true,
  })
  class: string;

  @Prop({ required: true })
  details: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Student.name })
  // student: Student;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
