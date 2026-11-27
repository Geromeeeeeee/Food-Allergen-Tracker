import { Controller, Get, Param } from '@nestjs/common';
import { AllergenService } from './allergen.service.js';

@Controller('allergen')
export class AllergenController {

    constructor(private readonly allergenService: AllergenService) {}

    @Get()
    GetAllergens(){
        return this.allergenService.findAll();
    }

    @Get(':id/menu-item')
    findOneWithMenuItems(@Param('id') id: string) {
        return this.allergenService.findOneWithMenuItems(+id);
    }
}
