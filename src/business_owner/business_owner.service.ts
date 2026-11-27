import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBusinessOwnerDto } from './dto/create-business_owner.dto.js';
import { UpdateBusinessOwnerDto } from './dto/update-business_owner.dto.js';
import { DeleteBusinessOwnerDto } from './dto/delete-business-owner-dto.js';
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
    const savedOwner = await this.businessOwnerRepository.save(newBusinessOwner);

    const { password: _, ...result } = savedOwner;

    return result;
  }

  findAll() {
    return `This action returns all businessOwner`;
  }

  findOne(id: number) {
    return this.businessOwnerRepository.findOne({
      where: {owner_id: id}
    })
  }

  async update(ownerId: number, updateBusinessOwnerDto: UpdateBusinessOwnerDto) {
    const {currentPassword, password, ...updateData} = updateBusinessOwnerDto
    const owner = await this.businessOwnerRepository
    .createQueryBuilder('owner')
    .addSelect('owner.password')
    .where('owner.owner_id = :id', {id: ownerId})
    .getOne()

    if(!owner){
      throw new UnauthorizedException("Account Does Not Exist")
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, owner.password)
    if(!isPasswordValid){
      throw new UnauthorizedException("Incorrect Password")
    }

    if(password){
      const salt = await bcrypt.genSalt();
      const ownerPassword = await bcrypt.hash(password, salt)
    }

    Object.assign(owner, updateData)

    await this.businessOwnerRepository.save(owner)

    const {password: _, ...result} = owner

    return "Profile Updated"

  }

  async remove(ownerId: number, currentPassword: string) {
    const owner = await this.businessOwnerRepository
    .createQueryBuilder('owner')
    .addSelect('owner.password')
    .where('owner.owner_id = :id', {id: ownerId})
    .getOne()

    if(!owner){
      throw new UnauthorizedException("Account Does Not Exist")
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, owner.password)
    if(!isPasswordValid){
      throw new UnauthorizedException("Incorrect Password")
    }

    await this.businessOwnerRepository.remove(owner)

    return "Account Deleted"
  }
}
