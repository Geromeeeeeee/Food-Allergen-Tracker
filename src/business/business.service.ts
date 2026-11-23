import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto.js';
import { UpdateBusinessDto } from './dto/update-business.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Business } from './entities/business.entity.js';

@Injectable()
export class BusinessService {

  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>
  ){}

  create(createBusinessDto: CreateBusinessDto) {
    const newBusiness = this.businessRepository.create(createBusinessDto)
    return this.businessRepository.save(newBusiness)
  }

  findAll(location?:string) {
    return this.businessRepository.find({
      where: location? {location: Like(`%${location}`)} : {},
      relations: {owner: true}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
