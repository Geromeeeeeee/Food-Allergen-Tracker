import { Injectable } from '@nestjs/common';
import { CreateBusinessOwnerDto } from './dto/create-business_owner.dto.js';
import { UpdateBusinessOwnerDto } from './dto/update-business_owner.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessOwner } from './entities/business_owner.entity.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BusinessOwnerService {

  constructor(
    @InjectRepository(BusinessOwner)
    private businessOwnerRepository: Repository<BusinessOwner>
  ){}

  async create(createBusinessOwnerDto: CreateBusinessOwnerDto) {
    const { password, ...restData } = createBusinessOwnerDto
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const newBusinessOwner = this.businessOwnerRepository.create({
      ...restData,
      password: hashedPass
    })

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
