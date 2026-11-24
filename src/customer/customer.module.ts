import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service.js';
import { CustomerController } from './customer.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity.js';
import { Allergen } from '../allergen/entities/allergen.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Allergen])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
