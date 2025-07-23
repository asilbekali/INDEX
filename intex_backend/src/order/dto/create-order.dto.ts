import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Buyurtmachining to‘liq ismi',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  userName: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Buyurtmachining telefon raqami (+998 va 9 ta raqam)',
  })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message:
      'Telefon raqami +998 bilan boshlanishi va 9 ta raqamdan iborat bo‘lishi kerak',
  })
  userPhone: string;

  @ApiProperty({
    example: 'Farg‘ona viloyati, Oltiariq tumani',
    description: 'Buyurtmachining manzili',
  })
  @IsString()
  @IsNotEmpty()
  userLocation: string;

  @ApiProperty({
    example: 1,
    description: 'Buyurtma qilingan mahsulotning ID raqami',
  })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsOptional()
  @IsString()
  status?: string;
}
