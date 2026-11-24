import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Customer } from './entities/customer.entity.js';
import * as bcrypt from 'bcrypt';
import { Allergen } from '../allergen/entities/allergen.entity.js';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Allergen)
    private allergenRepository: Repository<Allergen>
  ){}

  async create(createCustomerDto: CreateCustomerDto & {allergen_ids?: number[]}) {
    const {password, allergen_ids, ...restData} = createCustomerDto

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt);

    const newCustomer = this.customerRepository.create({
      ...restData,
      password: hashedPass
    })

    if(allergen_ids && allergen_ids.length>0){
      const attachedAllergens = await this.allergenRepository.findBy({
        allergen_id: In(allergen_ids),
      })
      newCustomer.allergens = attachedAllergens
    }

    return this.customerRepository.save(newCustomer);
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return this.customerRepository.findOne({
      where: {customer_id: id},
      relations: {allergens: true}
    })
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
