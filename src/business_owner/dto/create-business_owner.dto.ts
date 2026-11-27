import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateBusinessOwnerDto {

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
    @MinLength(8, {message: "Password must be at least 8 characters long"})
    password: string;
}
