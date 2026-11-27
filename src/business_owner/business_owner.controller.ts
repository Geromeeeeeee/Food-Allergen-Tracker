import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { BusinessOwnerService } from './business_owner.service.js';
import { CreateBusinessOwnerDto } from './dto/create-business_owner.dto.js';
import { UpdateBusinessOwnerDto } from './dto/update-business_owner.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { BusinessOwnerGuard } from '../auth/role_guards/business_owner_guard.js';
import { DeleteBusinessOwnerDto } from './dto/delete-business-owner-dto.js';

@Controller('business-owner')
export class BusinessOwnerController {
  constructor(private readonly businessOwnerService: BusinessOwnerService) {}

  @Post()
  create(@Body() createBusinessOwnerDto: CreateBusinessOwnerDto) {
    return this.businessOwnerService.create(createBusinessOwnerDto);
  }

  //:id retained for customer's retrieval of business owners whatever
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessOwnerService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  @Patch()
  update(
    @Req () req: any,
    @Body () updateBusinessOwnerDto: UpdateBusinessOwnerDto
  ) {
    const ownerId = req.user.userId
    return this.businessOwnerService.update(ownerId, updateBusinessOwnerDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, BusinessOwnerGuard)
  async remove (
    @Req() req: any,
    @Body() deleteBusinessOwnerDto: DeleteBusinessOwnerDto
  ) {
    const ownerId = req.user.userId;

    if (!ownerId) {
      throw new UnauthorizedException('You are not authorized to delete this account.');
    }

    return this.businessOwnerService.remove(ownerId, deleteBusinessOwnerDto.currentPassword);
  }
}
