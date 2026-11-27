import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export class UpdateBusinessOwnerDto{
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
    @MinLength(8, {message: "Password must be at least 8 characters long"})
    password: string;

    @IsNotEmpty()
    @IsString()
    currentPassword: string
}
