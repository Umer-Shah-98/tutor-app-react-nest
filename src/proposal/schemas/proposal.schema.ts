import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Proposal extends Document {
  @Prop({ required: true })
  tutorName: string;
  @Prop({ required: true })
  studentName: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({ required: true })
  tutorId: string;
  @Prop({ required: true })
  requestId: string;
  @Prop({ required: true })
  studentId: string;
  @Prop({ required: true })
  proposalText: string;
  @Prop({ required: true })
  subject: string;
  @Prop({ required: true })
  class: string;
  @Prop({ required: true, default: 0 })
  monthlyFee: number;
  @Prop({ default: false })
  isAccepted: boolean;
  @Prop({ default: false })
  isRejected: boolean;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);
