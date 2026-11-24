import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateBusinessOwnerDto{
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
    password: string;

    @IsNotEmpty()
    @IsString()
    currentPassword: string
}
