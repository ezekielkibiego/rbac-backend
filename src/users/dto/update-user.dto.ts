import { IsEmail, IsNotEmpty, IsOptional, IsString, IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string; // Optional first name

  @IsString()
  @IsOptional()
  lastName?: string; // Optional last name

  @IsEmail()
  @IsOptional()
  email?: string; // Optional email address

  @IsString()
  @IsOptional()
  password?: string; // Optional password (ensure you handle this securely)

  @IsString()
  @IsOptional()
  phone?: string; // Optional phone number

  @IsString()
  @IsOptional()
  address?: string; // Optional address

  @IsString()
  @IsOptional()
  kraPin?: string; // Optional KRA PIN (if applicable)

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ArrayNotEmpty()
  roleIds?: number[]; // Optional array of role IDs
}
