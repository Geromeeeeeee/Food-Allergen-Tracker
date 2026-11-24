import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @Post('login/business-owner')
    async loginBusinessOwner (@Body() body: {email: string; password:string}){
        return this.authService.loginBusinessOwner(body.email, body.password)
    }

    @Post('login/customer')
    async loginCustomer (@Body() body: {email: string; password:string}){
        return this.authService.loginCustomer(body.email, body.password)
    }

}
