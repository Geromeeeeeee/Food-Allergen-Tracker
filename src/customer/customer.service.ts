import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async getCustomerAllergen(customerId: number){
    const customer = await this.customerRepository.findOne({
      where:{customer_id: customerId},
      relations: {allergens: true}
    })

    if(!customer){
      throw new NotFoundException ("Profile Not Found")
    }

    return customer.allergens
  }

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

  findOne(id: number) {
    return this.customerRepository.findOne({
      where: {customer_id: id},
      relations: {allergens: true}
    })
  }

  async updateCustomer(customerId: number, updateCustomerDto: UpdateCustomerDto) {
    const { currentPassword, password, ...updateData } = updateCustomerDto;

    const customer = await this.customerRepository
      .createQueryBuilder('customer')
      .addSelect('customer.password')
      .where('customer.customer_id = :id', { id: customerId })
      .getOne();

    if (!customer) {
      throw new UnauthorizedException('Customer not found.');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, customer.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect current password.');
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      customer.password = await bcrypt.hash(password, salt);
    }

    Object.assign(customer, updateData);

    await this.customerRepository.save(customer);

    const { password: _, ...result } = customer;
    return "Profile Updated";
  }

  async updateCustomerAllergen(customerId: number, allergen_ids: number[]){
    const customer = await this.customerRepository.findOne({
      where:{customer_id: customerId},
      relations: {allergens: true}
    })

    if(!customer){
      throw new UnauthorizedException('Account Not Found');
    }

    const attachedAllergens = await this.allergenRepository.findBy({
      allergen_id: In(allergen_ids)
    })

    customer.allergens = attachedAllergens
    await this.customerRepository.save(customer)

    return {
      message: 'Allergens updated successfully',
      allergens: customer.allergens,
    };
  }

  async remove(customerId: number, currentPassword: string) {
    const customer = await this.customerRepository
    .createQueryBuilder('customer')
    .addSelect('customer.password')
    .where('customer.customer_id = :id', { id: customerId })
    .getOne();

    if (!customer) {
      throw new UnauthorizedException('Customer not found.');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, customer.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect current password.');
    }

    await this.customerRepository.remove(customer);

    return { message: 'Account successfully deleted.' };
  }

  async removeCustomerAllergen(customerId: number, allergenId: number) {
    const customer = await this.customerRepository.findOne({
      where: { customer_id: customerId },
      relations: { allergens: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    customer.allergens = customer.allergens.filter(
      (allergen) => allergen.allergen_id !== allergenId
    );

    await this.customerRepository.save(customer);

    return {
      message: 'Allergen successfully removed',
      allergens: customer.allergens,
    };
  }
}
