import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await this.prisma.category.findFirst({
      where: { name: createCategoryDto.name },
    });

    if (existing) {
      throw new BadRequestException('Bu nomdagi kategoriya allaqachon mavjud');
    }

    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(query: { page?: number; limit?: number; name?: string }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.categoryWhereInput = query.name
      ? {
          name: {
            contains: query.name,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.category.count({ where }),
    ]);

    return {
      data: categories,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`ID ${id} bo‘yicha kategoriya topilmadi`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existing = await this.prisma.category.findFirst({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`ID ${id} bo‘yicha kategoriya topilmadi`);
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.category.findFirst({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`ID ${id} bo‘yicha kategoriya topilmadi`);
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
