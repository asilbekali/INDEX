import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) throw new BadRequestException('Invalid category ID');

    const existing = await this.prisma.product.findFirst({
      where: { name: dto.name },
    });
    if (existing)
      throw new BadRequestException('Product with this name already exists');

    return this.prisma.product.create({ data: dto });
  }

  async findAll(limit = 10, page = 1, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? { name: { contains: search, mode: 'insensitive' as const } }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({ where, skip, take: limit }),
      this.prisma.product.count({ where }),
    ]);

    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!category) throw new BadRequestException('Invalid category ID');
    }

    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.product.delete({ where: { id } });
  }
}
