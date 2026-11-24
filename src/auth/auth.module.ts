import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { BusinessOwner } from '../business_owner/entities/business_owner.entity.js';
import { Customer } from '../customer/entities/customer.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy.js';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessOwner, Customer]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '1d'}
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
