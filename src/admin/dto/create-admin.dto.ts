import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MinLength,
    IsBoolean,
    MaxLength,
  } from 'class-validator';
  export class CreateAdminDto {
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
    readonly isAdmin: boolean;
    readonly role: string;
  }
  