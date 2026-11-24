import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { BusinessOwnerService } from './business_owner.service.js';
import { CreateBusinessOwnerDto } from './dto/create-business_owner.dto.js';
import { UpdateBusinessOwnerDto } from './dto/update-business_owner.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { DeleteBusinessOwnerDto } from './dto/delete-business-owner-dto.js';

@Controller('business-owner')
export class BusinessOwnerController {
  constructor(private readonly businessOwnerService: BusinessOwnerService) {}

  @Post()
  create(@Body() createBusinessOwnerDto: CreateBusinessOwnerDto) {
    return this.businessOwnerService.create(createBusinessOwnerDto);
  }

  @Get()
  findAll() {
    return this.businessOwnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessOwnerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessOwnerDto: UpdateBusinessOwnerDto) {
    return this.businessOwnerService.update(+id, updateBusinessOwnerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove (
    @Req() req: any, 
    @Param('id') id: string,
    @Body() deleteBusinessOwnerDto: DeleteBusinessOwnerDto
  ) {
    const loggedInUserId = req.user.userId;
    const targetId = +id;

    if (loggedInUserId !== targetId) {
      throw new UnauthorizedException('You are not authorized to delete this account.');
    }

    return this.businessOwnerService.remove(targetId, deleteBusinessOwnerDto.currentPassword);
  }
}
