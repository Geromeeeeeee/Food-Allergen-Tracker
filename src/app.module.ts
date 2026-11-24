import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AllergenModule } from './allergen/allergen.module.js';
import { BusinessModule } from './business/business.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module.js';
import { BusinessOwnerModule } from './business_owner/business_owner.module.js';
import { AuthModule } from './auth/auth.module.js';
import { MenuItemModule } from './menu_item/menu_item.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CustomerModule, BusinessOwnerModule, AllergenModule, BusinessModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'foodallergendb',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    MenuItemModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
