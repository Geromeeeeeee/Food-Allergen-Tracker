import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allergen } from './entities/allergen.entity.js';

@Injectable()
export class AllergenService {
    constructor(
        @InjectRepository(Allergen)
        private allergenRepository: Repository<Allergen>,
    ){}
    
    findAll(){
        return this.allergenRepository.find();
    }

    async findOneWithMenuItems(allergenId: number) {
    const allergen = await this.allergenRepository.findOne({
      where: { allergen_id: allergenId },
      relations: { menuItems: true }
    });

    if (!allergen) {
      throw new NotFoundException('Allergen does not exist.');
    }

    return allergen;
  }
}
