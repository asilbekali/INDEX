import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
export declare class ConsultationController {
    private readonly consultationService;
    constructor(consultationService: ConsultationService);
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
    findOne(id: string): Promise<{
        id: number;
        name: string;
        phone: string;
        createAt: Date;
    }>;
    update(id: string, updateConsultationDto: UpdateConsultationDto): Promise<{
        id: number;
        name: string;
        phone: string;
        createAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        phone: string;
        createAt: Date;
    }>;
}
