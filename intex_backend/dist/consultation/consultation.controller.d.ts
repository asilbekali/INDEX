import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
export declare class ConsultationController {
    private readonly consultationService;
    constructor(consultationService: ConsultationService);
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
    findOne(id: string): Promise<{
        name: string;
        id: number;
        createAt: Date;
        phone: string;
    }>;
    update(id: string, updateConsultationDto: UpdateConsultationDto): Promise<{
        name: string;
        id: number;
        createAt: Date;
        phone: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        createAt: Date;
        phone: string;
    }>;
}
