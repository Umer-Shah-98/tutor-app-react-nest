import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly username: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(128)
  readonly password: string;
  @IsBoolean()
  readonly isStudent: boolean;

}
