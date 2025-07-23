import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const product = await this.prisma.product.findFirst({
      where: { id: createOrderDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Bunday product topilmadi!');
    }

    return this.prisma.order.create({
      data: {
        userName: createOrderDto.userName,
        userPhone: createOrderDto.userPhone,
        userLocation: createOrderDto.userLocation,
        product: {
          connect: { id: createOrderDto.productId },
        },
        // status maydoni kiritilmaydi – default(active) bo'ladi
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        product: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findFirst({
      where: { id },
      include: { product: true },
    });

    if (!order) {
      throw new NotFoundException(`Buyurtma topilmadi (id: ${id})`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const existingOrder = await this.prisma.order.findFirst({
      where: { id },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Bunday buyurtma mavjud emas (id: ${id})`);
    }

    if (updateOrderDto.productId) {
      const product = await this.prisma.product.findFirst({
        where: { id: updateOrderDto.productId },
      });

      if (!product) {
        throw new NotFoundException(
          'Yangilash uchun berilgan productId mavjud emas',
        );
      }
    }

    const updateData: any = {
      userName: updateOrderDto.userName,
      userPhone: updateOrderDto.userPhone,
      userLocation: updateOrderDto.userLocation,
    };

    if (updateOrderDto.productId) {
      updateData.product = {
        connect: { id: updateOrderDto.productId },
      };
    }

    if (updateOrderDto.status) {
      updateData.status = updateOrderDto.status;
    }

    return this.prisma.order.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    const existingOrder = await this.prisma.order.findFirst({
      where: { id },
    });

    if (!existingOrder) {
      throw new NotFoundException(
        `O‘chirish uchun buyurtma topilmadi (id: ${id})`,
      );
    }

    return this.prisma.order.delete({
      where: { id },
    });
  }
}
