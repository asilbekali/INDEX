import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ConsultationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConsultationDto: CreateConsultationDto) {
    try {
      return await this.prisma.consultation.create({
        data: createConsultationDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Konsultatsiya yaratishda xatolik yuz berdi',
      );
    }
  }

  async findAll(query: { page?: string; limit?: string; search?: string }) {
    try {
      const page = parseInt(query.page ?? '1');
      const limit = parseInt(query.limit ?? '10');
      const search = query.search ?? '';

      const skip = (page - 1) * limit;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.consultation.findMany({
          where: {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
            ],
          },
          skip,
          take: limit,
          orderBy: {
            id: 'desc',
          },
        }),
        this.prisma.consultation.count({
          where: {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
            ],
          },
        }),
      ]);

      return {
        data,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Konsultatsiyalarni olishda xatolik yuz berdi',
      );
    }
  }
  async findOne(id: number) {
    try {
      const consultation = await this.prisma.consultation.findFirst({
        where: { id },
      });

      if (!consultation) {
        throw new NotFoundException(
          `ID ${id} bo‘yicha konsultatsiya topilmadi`,
        );
      }

      return consultation;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Konsultatsiyani olishda xatolik yuz berdi',
      );
    }
  }

  async update(id: number, updateConsultationDto: UpdateConsultationDto) {
    try {
      const consultation = await this.prisma.consultation.findFirst({
        where: { id },
      });

      if (!consultation) {
        throw new NotFoundException(
          `ID ${id} bo‘yicha konsultatsiya topilmadi`,
        );
      }

      return await this.prisma.consultation.update({
        where: { id },
        data: updateConsultationDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Konsultatsiyani yangilashda xatolik yuz berdi',
      );
    }
  }

  async remove(id: number) {
    try {
      const consultation = await this.prisma.consultation.findFirst({
        where: { id },
      });

      if (!consultation) {
        throw new NotFoundException(
          `ID ${id} bo‘yicha konsultatsiya topilmadi`,
        );
      }

      return await this.prisma.consultation.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Konsultatsiyani o‘chirishda xatolik yuz berdi',
      );
    }
  }
}
