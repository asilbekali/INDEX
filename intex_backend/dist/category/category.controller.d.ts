import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
        createAt: Date;
    }>;
    findAll(page?: number, limit?: number, name?: string): Promise<{
        data: {
            id: number;
            name: string;
            createAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        createAt: Date;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
        createAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        createAt: Date;
    }>;
}
