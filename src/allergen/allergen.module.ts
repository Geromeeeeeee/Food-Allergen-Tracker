import { Module } from '@nestjs/common';
import { AllergenController } from './allergen.controller.js';
import { AllergenService } from './allergen.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergen } from './entities/allergen.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Allergen])],
  controllers: [AllergenController],
  providers: [AllergenService]
})
export class AllergenModule {}
