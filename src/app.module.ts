import { Module } from '@nestjs/common';
import { UserModule } from './login/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ProductModule],
})
export class AppModule {}
