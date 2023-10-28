import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Request } from 'src/request/schemas/request.schema';
@Schema({
  timestamps: true,
})
export class Student extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: false,
    required: true,
    validate: [IsBoolean, 'Tutor field must be a boolean'],
  })
  isStudent: boolean;

  @Prop({ default: 'student' }) // Default role is 'student'
  role: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }] })
  // requests: Request[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
