import { All, Injectable } from '@nestjs/common';
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
}
