import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
