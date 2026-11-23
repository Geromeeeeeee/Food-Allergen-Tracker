import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu_item.dto.js';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MenuItem } from './entities/menu_item.entity.js';
import { Allergen } from '../allergen/entities/allergen.entity.js';

@Injectable()
export class MenuItemService {

  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository <MenuItem>,

    @InjectRepository(Allergen)
    private allergenRepository: Repository<Allergen>
  ){}

  async create(createMenuItemDto: CreateMenuItemDto) {
    const { allergen_ids, ...menuItemData } = createMenuItemDto;
    const newItem = this.menuItemRepository.create(menuItemData)
    if (allergen_ids && allergen_ids.length > 0) {
      const foundAllergens = await this.allergenRepository.findBy({
        allergen_id: In(allergen_ids),
      });
      newItem.allergens = foundAllergens;
    }
    return this.menuItemRepository.save(newItem)
  }

  findAll(businessId?: number) {
    return this.menuItemRepository.find({
      where: businessId ? { business_id: businessId } : {},
      relations: { business: true, allergens: true },
    });
  }

  findOne(id: number) {
    return this.menuItemRepository.findOne({
      where:{menu_id: id},
      relations: {business: true}
    })
  }

  update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    return `This action updates a #${id} menuItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuItem`;
  }
}
