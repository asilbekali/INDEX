import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register_admin(dto: CreateAuthDto): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            image: string;
            role: import(".prisma/client").$Enums.role;
            createAt: Date;
        };
    }>;
    register_super_admin(dto: CreateAuthDto): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            image: string;
            role: import(".prisma/client").$Enums.role;
            createAt: Date;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accesToken: string;
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            image: string;
            role: import(".prisma/client").$Enums.role;
            createAt: Date;
        };
    }>;
    findAll(page?: number, limit?: number, search?: string, role?: string): Promise<{
        data: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.role;
            createAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    update(id: number, dto: UpdateAuthDto): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            image: string;
            role: import(".prisma/client").$Enums.role;
            createAt: Date;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
