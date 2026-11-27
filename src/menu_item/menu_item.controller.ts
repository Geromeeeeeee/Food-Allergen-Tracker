import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { MenuItemService } from './menu_item.service.js';
import { CreateMenuItemDto } from './dto/create-menu_item.dto.js';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { BusinessOwnerGuard } from '../auth/role_guards/business_owner_guard.js';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Post(':id/allergen')
  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  attachAllergens(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { allergen_ids: number[] },
  ) {
    const businessOwnerId = req.user.userId;
    return this.menuItemService.attachAllergensToMenuItem(+id, businessOwnerId, body.allergen_ids);
  }

  @Get()
  findAll(@Query('business_id') businessId? : string) {
    return this.menuItemService.findAll(businessId ? +businessId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemService.findOne(+id);
  }

  @Get(':id/allergens')
  findOneWithAllergens(@Param('id') id: string) {
    return this.menuItemService.findItemAllergen(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  update(
    @Req() req: any,
    @Param('id') menuId: string, 
    @Body() updateMenuItemDto: UpdateMenuItemDto
  ) {
    const businessOwnerId = req.user.userId;
    return this.menuItemService.update(+menuId, businessOwnerId, updateMenuItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  async remove(
    @Req() req: any,
    @Param('id') id: string
  ) {
    const businessOwnerId = req.user.userId;
    return this.menuItemService.remove(+id, businessOwnerId);
  }

  @Delete(':id/allergen/:allergenId')
  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  removeMenuAllergen(
    @Req() req: any,
    @Param('id') menuId: string,
    @Param('allergenId') allergenId: string,
  ) {
    const businessOwnerId = req.user.userId;
    return this.menuItemService.removeMenuItemAllergen(+menuId, businessOwnerId, +allergenId);
  }
}
