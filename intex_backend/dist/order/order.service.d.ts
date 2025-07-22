import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class OrderService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        id: number;
        createAt: Date;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    }>;
    findAll(): Promise<({
        product: {
            name: string;
            image: string;
            id: number;
            createAt: Date;
            discount: number;
            price: number;
            frame: import(".prisma/client").$Enums.frame;
            size: number;
            status: import(".prisma/client").$Enums.status;
            count: number;
            tall: number;
            categoryId: number;
        };
    } & {
        id: number;
        createAt: Date;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    })[]>;
    findOne(id: number): Promise<{
        product: {
            name: string;
            image: string;
            id: number;
            createAt: Date;
            discount: number;
            price: number;
            frame: import(".prisma/client").$Enums.frame;
            size: number;
            status: import(".prisma/client").$Enums.status;
            count: number;
            tall: number;
            categoryId: number;
        };
    } & {
        id: number;
        createAt: Date;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        id: number;
        createAt: Date;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createAt: Date;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    }>;
}
