import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateConsultationDto {
  @ApiProperty({
    example: 'Asilbek Abdugafforov',
    description: 'Foydalanuvchining to‘liq ismi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Foydalanuvchining telefon raqami',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message:
      'Telefon raqami +998 bilan boshlanishi va 9 ta raqamdan iborat bo‘lishi kerak',
  })
  phone: string;
}
