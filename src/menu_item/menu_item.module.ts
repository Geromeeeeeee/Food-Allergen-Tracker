import { Module } from '@nestjs/common';
import { MenuItemService } from './menu_item.service.js';
import { MenuItemController } from './menu_item.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu_item.entity.js';
import { Allergen } from '../allergen/entities/allergen.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Allergen])],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
