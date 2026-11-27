import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { BusinessService } from './business.service.js';
import { CreateBusinessDto } from './dto/create-business.dto.js';
import { UpdateBusinessDto } from './dto/update-business.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { BusinessOwnerGuard } from '../auth/role_guards/business_owner_guard.js';

@Controller('business')
@UseGuards(JwtAuthGuard)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  @Post()
  create(@Req() req: any, @Body() createBusinessDto: CreateBusinessDto) {
    const ownerId = req.user.userId;
    return this.businessService.create(ownerId, createBusinessDto);
  }

  @Get()
  findAll(@Query('location') location?: string) {
    return this.businessService.findAll(location);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.businessService.findByName(name);
  }

  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  @Patch(':id')
  update(@Req() req: any, @Param('id') businessId: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    const ownerId = req.user.userId;

    return this.businessService.update(+businessId, +ownerId, updateBusinessDto)
  }

  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  @Delete(':id')
  remove(
    @Req() req: any, @Param('id') businessId: string
  ) {
    const ownerId = req.user.userId
    return this.businessService.remove(+businessId, +ownerId);
  }
}
