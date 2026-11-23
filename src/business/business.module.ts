import { Module } from '@nestjs/common';
import { BusinessService } from './business.service.js';
import { BusinessController } from './business.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity.js';
import { BusinessOwner } from '../business_owner/entities/business_owner.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Business, BusinessOwner])],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
