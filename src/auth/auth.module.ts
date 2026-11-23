import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { BusinessOwner } from '../business_owner/entities/business_owner.entity.js';
import { Customer } from '../customer/entities/customer.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessOwner, Customer]),
    JwtModule.register({
      global: true,
      secret: "PAPALITAN NG ENV MAMAYA",
      signOptions: {expiresIn: '1h'}
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
