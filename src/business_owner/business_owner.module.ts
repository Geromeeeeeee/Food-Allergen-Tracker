import { Module } from '@nestjs/common';
import { BusinessOwnerService } from './business_owner.service.js';
import { BusinessOwnerController } from './business_owner.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessOwner } from './entities/business_owner.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessOwner])],
  controllers: [BusinessOwnerController],
  providers: [BusinessOwnerService],
})
export class BusinessOwnerModule {}
