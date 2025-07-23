import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<{
        id: number;
        createAt: Date;
        status: import(".prisma/client").$Enums.checked;
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
        status: import(".prisma/client").$Enums.checked;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    })[]>;
    findOne(id: string): Promise<{
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
        status: import(".prisma/client").$Enums.checked;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        id: number;
        createAt: Date;
        status: import(".prisma/client").$Enums.checked;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createAt: Date;
        status: import(".prisma/client").$Enums.checked;
        userName: string;
        userPhone: string;
        userLocation: string;
        productId: number;
    }>;
}
