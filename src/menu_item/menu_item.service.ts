import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    private allergenRepository: Repository<Allergen>,
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

  async update(menuId: number, businessOwnerId: number, updateMenuItemDto: UpdateMenuItemDto) {
    const { allergen_ids, ...menuData } = updateMenuItemDto;

    const menuItem = await this.menuItemRepository.findOne({
      where: { menu_id: menuId },
      relations: { 
        allergens: true, 
        business: true
      },
    });

    if (!menuItem) {
      throw new NotFoundException('Item does not exist.');
    }

    if (menuItem.business.owner_id !== businessOwnerId) {
      throw new UnauthorizedException('You are not authorized to update menu items for another business.');
    }

    Object.assign(menuItem, menuData);

    if (allergen_ids !== undefined) {
      if (allergen_ids.length > 0) {
        const attachedAllergens = await this.allergenRepository.findBy({
          allergen_id: In(allergen_ids),
        });
        menuItem.allergens = attachedAllergens;
      } else {
        menuItem.allergens = [];
      }
    }

    await this.menuItemRepository.save(menuItem);

    return {
      message: 'Menu item updated successfully',
      menuItem,
    };
  }

  async remove(itemId: number, businessOwnerId: number) {
    const menuItem = await this.menuItemRepository.findOne({
      where: { menu_id: itemId },
      relations: { business: true }
    });

    if (!menuItem) {
      throw new NotFoundException('Item not found');
    }

    if (menuItem.business.owner_id !== businessOwnerId) {
      throw new UnauthorizedException('You are not authorized to delete menu items for another business.');
    }

    await this.menuItemRepository.remove(menuItem);

    return { message: 'Item successfully deleted' };
  }
}
