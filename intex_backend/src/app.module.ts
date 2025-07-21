import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from './multe-r/multer.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ConsultationModule } from './consultation/consultation.module';

@Module({
  imports: [PrismaModule, AuthModule, MulterModule, CategoryModule, ProductModule, ConsultationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
