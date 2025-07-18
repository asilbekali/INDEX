import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
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
    login(dto: CreateAuthDto): Promise<{
        message: string;
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.role;
            image: string;
            createAt: Date;
        };
    }>;
    findAll(options: {
        page?: number;
        limit?: number;
        search?: string;
        role?: string;
    }): Promise<{
        data: {
            name: string;
            email: string;
            id: number;
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
            name: string;
            email: string;
            password: string;
            image: string;
            id: number;
            role: import(".prisma/client").$Enums.role;
            createAt: Date;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
