import { IsString, IsOptional, IsEmail, MinLength, IsNotEmpty, IsArray, NotEquals } from 'class-validator';

export class UpdateCustomerDto{
    @IsOptional()
    @IsString()
    fname: string;

    @IsOptional()
    @IsString()
    lname: string;

    @IsOptional()
    @IsEmail({}, {message: "Please use a valid email address"})
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(8, {message: "Password must be at least 8 characters"})
    password: string;

    @IsString()
    @IsNotEmpty()
    currentPassword: string
}