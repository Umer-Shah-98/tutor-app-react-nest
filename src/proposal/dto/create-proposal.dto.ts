import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateProposalDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly tutorName: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly studentName: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly tutorId: string;
  @IsString()
  @IsNotEmpty()
  readonly studentId: string;
  @IsString()
  @IsNotEmpty()
  readonly requestId: string;
  @IsString()
  @IsNotEmpty()
  readonly subject: string;
  @IsString()
  @IsNotEmpty()
  readonly class: string;
  @IsBoolean()
  readonly isAccepted: boolean;
  @IsBoolean()
  readonly isRejected: boolean;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly proposalText: string;
  @IsNotEmpty()
  @IsNumber()
  readonly monthlyFee: string;
}
