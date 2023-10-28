import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Admin extends Document {
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
  isAdmin: boolean;

  @Prop({ default: 'admin' })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
