import { IsString, IsOptional, IsEmail, MinLength, IsNotEmpty, IsArray, NotEquals } from 'class-validator';

export class UpdateCustomerDto{
    @IsOptional()
    @IsString()
    fname: string;

    @IsOptional()
    @IsString()
    lname: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsArray()
    allergen_ids?: number[];

    @IsString()
    @IsNotEmpty()
    currentPassword: string
}