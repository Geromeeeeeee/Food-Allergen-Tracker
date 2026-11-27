import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
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

  @Get('allergen')
  @UseGuards(JwtAuthGuard)
  getMyAllergens(@Req() req:any){
    const customerId = req.user.userId
    return this.customerService.getCustomerAllergen(customerId)
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

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: any,  
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    const customerId = req.user.userId;

    return this.customerService.updateCustomer(customerId, updateCustomerDto);
  }

  @Put('allergen')
  @UseGuards(JwtAuthGuard)
  updateAllergens(
    @Req() req: any,
    @Body() body: { allergen_ids: number[] }
  ){
    const customerId = req.user.userId;
    return this.customerService.updateCustomerAllergen(customerId, body.allergen_ids);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async remove(
    @Req() req: any,  
    @Body() deleteAccountDto: DeleteAccountDto
  ) {
    const customerId = req.user.userId;

    if (!customerId) {
      throw new UnauthorizedException('You are not authorized to delete this account.');
    }

    return this.customerService.remove(customerId, deleteAccountDto.currentPassword);
  }

  @Delete('allergens/:allergenId')
  @UseGuards(JwtAuthGuard)
  async removeAllergen(
    @Req() req: any, 
    @Param('allergenId') allergenId: string,
  ){
    const customerId = req.user.userId;
    return this.customerService.removeCustomerAllergen(customerId, +allergenId);
  }
}
