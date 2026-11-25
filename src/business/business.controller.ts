import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { BusinessService } from './business.service.js';
import { CreateBusinessDto } from './dto/create-business.dto.js';
import { UpdateBusinessDto } from './dto/update-business.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('business')
@UseGuards(JwtAuthGuard)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  findAll(@Query('location') location?: string) {
    return this.businessService.findAll(location);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') businessId: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    const ownerId = req.user.userId;

    return this.businessService.update(+businessId, +ownerId, updateBusinessDto)
  }

  @Delete(':id')
  remove(
    @Req() req: any, @Param('id') businessId: string
  ) {
    const ownerId = req.user.userId
    return this.businessService.remove(+businessId, +ownerId);
  }
}
