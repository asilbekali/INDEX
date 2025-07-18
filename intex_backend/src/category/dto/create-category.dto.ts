import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Elektronika',
    description: 'Kategoriya nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
