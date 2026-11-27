import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto{
    
    @IsNotEmpty()
    @IsEmail({},{message: "Please use a valid email"})
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string
}
