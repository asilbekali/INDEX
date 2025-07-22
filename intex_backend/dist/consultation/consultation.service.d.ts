import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class ConsultationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createConsultationDto: CreateConsultationDto): Promise<{
        name: string;
        id: number;
        createAt: Date;
        phone: string;
    }>;
    findAll(query: {
        page?: string;
        limit?: string;
        search?: string;
    }): Promise<{
        data: {
            name: string;
            id: number;
            createAt: Date;
            phone: string;
        }[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        createAt: Date;
        phone: string;
    }>;
    update(id: number, updateConsultationDto: UpdateConsultationDto): Promise<{
        name: string;
        id: number;
        createAt: Date;
        phone: string;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        createAt: Date;
        phone: string;
    }>;
}
