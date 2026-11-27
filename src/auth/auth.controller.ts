import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @Post('login/business-owner')
    async loginBusinessOwner (@Body() loginDto: LoginDto){
        return this.authService.loginBusinessOwner(loginDto.email, loginDto.password)
    }

    @Post('login/customer')
    async loginCustomer (@Body() loginDto: LoginDto){
        return this.authService.loginCustomer(loginDto.email, loginDto.password)
    }

}
