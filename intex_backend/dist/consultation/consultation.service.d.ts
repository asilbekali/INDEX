import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class ConsultationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createConsultationDto: CreateConsultationDto): Promise<{
        id: number;
        name: string;
        phone: string;
        createAt: Date;
    }>;
    findAll(query: {
        page?: string;
        limit?: string;
        search?: string;
    }): Promise<{
        data: {
            id: number;
            name: string;
            phone: string;
            createAt: Date;
        }[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        phone: string;
        createAt: Date;
    }>;
    update(id: number, updateConsultationDto: UpdateConsultationDto): Promise<{
        id: number;
        name: string;
        phone: string;
        createAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        phone: string;
        createAt: Date;
    }>;
}
