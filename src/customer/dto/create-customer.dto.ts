import { IsEmail, IsNotEmpty, MinLength, IsString, IsNumber, IsOptional, IsArray } from "class-validator";

export class CreateCustomerDto {

    @IsNotEmpty()
    @IsString()
    fname: string;

    @IsNotEmpty()
    @IsString()
    lname: string;

    @IsNotEmpty()
    @IsEmail({}, {message: "Please use a valid email address"})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: "Password must be at least 8 characters"})
    password: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    allergen_ids?: number[]
}
