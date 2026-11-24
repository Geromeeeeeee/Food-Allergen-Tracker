import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CustomerService } from './customer.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { UnauthorizedException } from '@nestjs/common';
import { DeleteAccountDto } from './dto/delete-customer-dto.js';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {

    const customerId = req.user.userId; 
    return this.customerService.findOne(customerId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: any, 
    @Param('id') id: string, 
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    const loggedInUserId = req.user.userId;
    const targetId = +id;

    if (loggedInUserId !== targetId) {
      throw new UnauthorizedException('You are not authorized to update this account.');
    }

    return this.customerService.updateCustomer(targetId, updateCustomerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Req() req: any, 
    @Param('id') id: string, 
    @Body() deleteAccountDto: DeleteAccountDto
  ) {
    const loggedInUserId = req.user.userId;
    const targetId = +id;

    if (loggedInUserId !== targetId) {
      throw new UnauthorizedException('You are not authorized to delete this account.');
    }

    return this.customerService.remove(targetId, deleteAccountDto.currentPassword);
  }
}
