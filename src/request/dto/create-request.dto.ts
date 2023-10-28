import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateRequestDto {
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
  readonly id: string;
  @IsNotEmpty()
  @IsString()
  readonly class: boolean;
  @IsNotEmpty()
  @IsString()
  readonly subject: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly details: string;
}
