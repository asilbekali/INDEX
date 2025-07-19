import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto): Promise<{
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
    }>;
    findAll(limit?: number, page?: number, search?: string): Promise<{
        data: {
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
        }[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, dto: UpdateProductDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
