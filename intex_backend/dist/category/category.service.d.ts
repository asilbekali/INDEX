import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
        createAt: Date;
    }>;
    findAll(query: {
        page?: number;
        limit?: number;
        name?: string;
    }): Promise<{
        data: {
            name: string;
            id: number;
            createAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        createAt: Date;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        createAt: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        createAt: Date;
    }>;
}
