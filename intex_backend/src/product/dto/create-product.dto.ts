import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Frame {
  circle = 'circle',
  square = 'square',
}

enum Status {
  recomend = 'recomend',
  discount = 'discount',
  end = 'end',
}

export class CreateProductDto {
  @ApiProperty({ example: 'Lux Chair', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL or path of the product image',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 150000, description: 'Product price in UZS' })
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 'circle', enum: Frame })
  @IsEnum(Frame)
  frame: Frame;

  @ApiProperty({ example: 120, description: 'Size of the product in cm' })
  @IsInt()
  @IsPositive()
  size: number;

  @ApiProperty({ example: 'recomend', enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ example: 25, description: 'Number of items in stock' })
  @IsInt()
  @IsPositive()
  count: number;

  @ApiProperty({ example: 10, description: 'Discount percentage' })
  @IsInt()
  discount: number;

  @ApiProperty({ example: 80, description: 'Product height in cm' })
  @IsInt()
  @IsPositive()
  tall: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the category this product belongs to',
  })
  @IsInt()
  @IsPositive()
  categoryId: number;
}
