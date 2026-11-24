import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessOwner } from '../business_owner/entities/business_owner.entity.js';
import { Customer } from '../customer/entities/customer.entity.js';
import * as bcrypt from 'bcrypt';

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
        const owner = await this.businesOwnerRepository
            .createQueryBuilder('owner')
            .addSelect('owner.password')
            .where('owner.email = :email', { email })
            .getOne();

        if(!owner){
            throw new UnauthorizedException('Invalid email or password.');
        }

        const validPass = await bcrypt.compare(pass, owner.password)
        if(!validPass){
            throw new UnauthorizedException('Invalid email or password.');
        }

        const payload = {sub: owner.owner_id, email: owner.email, role: 'business_owner'}

        return{
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    //Customer Login dito
    async loginCustomer(email: string, pass:string){
        const customerRecord = await this.customerRepository
            .createQueryBuilder('customer')
            .addSelect('customer.password')
            .where('customer.email = :email', { email })
            .getOne();

        if (!customerRecord) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        const validPass = await bcrypt.compare(pass, customerRecord.password)
        if(!validPass){
            throw new UnauthorizedException('Invalid email or password.');
        }
        const payload = {sub: customerRecord.customer_id, email: customerRecord.email, role: 'customer'}

        return{
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
