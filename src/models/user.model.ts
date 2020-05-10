import {
  IsEmail, IsOptional, IsString, MaxLength, MinLength
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;
  
  @IsString()
  @MinLength(4)
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;
  
  @IsOptional()
  image: string;
  
  @IsOptional()
  bio: string;
}


export interface AuthPayload {
  name: string;
}
