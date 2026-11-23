import { Controller, Get } from '@nestjs/common';
import { AllergenService } from './allergen.service.js';

@Controller('allergen')
export class AllergenController {

    constructor(private readonly allergenService: AllergenService) {}

    @Get()
    GetAllergens(){
        return this.allergenService.findAll();
    }
}
