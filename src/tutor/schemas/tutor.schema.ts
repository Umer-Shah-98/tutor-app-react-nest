import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Tutor extends Document {
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
  isTutor: boolean;

  @Prop({ default: 'tutor' })
  role: string;
  @Prop({ default: 0 })
  balance: number;
}

export const TutorSchema = SchemaFactory.createForClass(Tutor);
