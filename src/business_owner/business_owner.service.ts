import { Injectable } from '@nestjs/common';
import { CreateBusinessOwnerDto } from './dto/create-business_owner.dto.js';
import { UpdateBusinessOwnerDto } from './dto/update-business_owner.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessOwner } from './entities/business_owner.entity.js';

@Injectable()
export class BusinessOwnerService {

  constructor(
    @InjectRepository(BusinessOwner)
    private businessOwnerRepository: Repository<BusinessOwner>
  ){}

  create(createBusinessOwnerDto: CreateBusinessOwnerDto) {
    const newBusinessOwner = this.businessOwnerRepository.create(createBusinessOwnerDto);
    return this.businessOwnerRepository.save(newBusinessOwner)
  }

  findAll() {
    return `This action returns all businessOwner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessOwner`;
  }

  update(id: number, updateBusinessOwnerDto: UpdateBusinessOwnerDto) {
    return `This action updates a #${id} businessOwner`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessOwner`;
  }
}
