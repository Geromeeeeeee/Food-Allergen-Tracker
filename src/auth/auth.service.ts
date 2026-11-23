import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessOwner } from '../business_owner/entities/business_owner.entity.js';
import { Customer } from '../customer/entities/customer.entity.js';

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(BusinessOwner)
    private businesOwnerRepository: Repository<BusinessOwner>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private jwtService: JwtService,
    ){}

    //Business Owner Login right hereeee
    async loginBusinessOwner(email: string, pass:string) {
        const owner = await this.businesOwnerRepository.findOne({where: {email}})

        if(!owner || owner?.password !== pass){
            throw new UnauthorizedException("Invalid Email or Password")
        }

        const payload = {sub: owner.owner_id, email: owner.email, role: 'business_owner'}

        return{
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    //Customer Login dito
    async loginCustomer(email: string, pass:string){
        const customer = await this.customerRepository.findOne({where: {email}})

        if(!customer || customer?.password!== pass){
            throw new UnauthorizedException("Invalid Email or Password")
        }

        const payload = {sub: customer.customer_id, email: customer.email, role: 'customer'}

        return{
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
