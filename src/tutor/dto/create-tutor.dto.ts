import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  MaxLength,
  IsNumber,
} from 'class-validator';
export class CreateTutorDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(128)
  readonly password: string;
  @IsBoolean()
  readonly isTutor: boolean;
  readonly role: string;
 
}
