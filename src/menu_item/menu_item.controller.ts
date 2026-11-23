import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MenuItemService } from './menu_item.service.js';
import { CreateMenuItemDto } from './dto/create-menu_item.dto.js';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('menu-item')
@UseGuards(JwtAuthGuard)
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Get()
  findAll(@Query('business_id') businessId? : string) {
    return this.menuItemService.findAll(businessId ? +businessId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuItemService.update(+id, updateMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemService.remove(+id);
  }
}
