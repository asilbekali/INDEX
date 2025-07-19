import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        name: string;
        image: string;
        price: number;
        frame: import(".prisma/client").$Enums.frame;
        size: number;
        status: import(".prisma/client").$Enums.status;
        count: number;
        discount: number;
        tall: number;
        categoryId: number;
        createAt: Date;
    }>;
    findAll(limit?: string, page?: string, search?: string): Promise<{
        data: {
            id: number;
            name: string;
            image: string;
            price: number;
            frame: import(".prisma/client").$Enums.frame;
            size: number;
            status: import(".prisma/client").$Enums.status;
            count: number;
            discount: number;
            tall: number;
            categoryId: number;
            createAt: Date;
        }[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        image: string;
        price: number;
        frame: import(".prisma/client").$Enums.frame;
        size: number;
        status: import(".prisma/client").$Enums.status;
        count: number;
        discount: number;
        tall: number;
        categoryId: number;
        createAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        name: string;
        image: string;
        price: number;
        frame: import(".prisma/client").$Enums.frame;
        size: number;
        status: import(".prisma/client").$Enums.status;
        count: number;
        discount: number;
        tall: number;
        categoryId: number;
        createAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        image: string;
        price: number;
        frame: import(".prisma/client").$Enums.frame;
        size: number;
        status: import(".prisma/client").$Enums.status;
        count: number;
        discount: number;
        tall: number;
        categoryId: number;
        createAt: Date;
    }>;
}
