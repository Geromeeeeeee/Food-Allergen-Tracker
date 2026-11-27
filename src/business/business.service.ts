import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(ownerId: number, createBusinessDto: CreateBusinessDto) {
    const newBusiness = this.businessRepository.create({
      ...createBusinessDto,
      owner: { owner_id: ownerId }
    });
    return this.businessRepository.save(newBusiness);
  }

  findAll(location?:string) {
    return this.businessRepository.find({
      where: location? {location: Like(`%${location}`)} : {},
      relations: {owner: true}
    })
  }

  async findByName(name: string) {
    const business = await this.businessRepository.findOne({
      where: { business_name: Like(`%${name}%`) },
      relations: { owner: true }
    });

    if (!business) {
      throw new NotFoundException(`Business with name matching "${name}" not found.`);
    }

    return business;
  }

  async update(businessId: number, ownerId: number, updateBusinessDto: UpdateBusinessDto) {
    const business = await this.businessRepository.findOne({
      where:{
        business_id: businessId,
        owner_id: ownerId
      }
    })

    if(!business){
      throw new NotFoundException('Business not found or you do not have permission to update it.');
    }

    Object.assign(business, updateBusinessDto);

    return this.businessRepository.save(business);
  }

  async remove(businessId: number, ownerId: number) {
    const business = await this.businessRepository.findOne({
      where:{
        business_id: businessId,
        owner_id: ownerId
      }
    })

    if(!business){
      throw new NotFoundException('Business not found or you do not have permission to update it.');
    }

    await this.businessRepository.remove(business)

    return {message: "Delete Successful"}
  }
}
