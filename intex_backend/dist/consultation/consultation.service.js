"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let ConsultationService = class ConsultationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createConsultationDto) {
        try {
            return await this.prisma.consultation.create({
                data: createConsultationDto,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Konsultatsiya yaratishda xatolik yuz berdi');
        }
    }
    async findAll(query) {
        try {
            const page = parseInt(query.page ?? '1');
            const limit = parseInt(query.limit ?? '10');
            const search = query.search ?? '';
            const skip = (page - 1) * limit;
            const [data, total] = await this.prisma.$transaction([
                this.prisma.consultation.findMany({
                    where: {
                        OR: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { phone: { contains: search, mode: 'insensitive' } },
                        ],
                    },
                    skip,
                    take: limit,
                    orderBy: {
                        id: 'desc',
                    },
                }),
                this.prisma.consultation.count({
                    where: {
                        OR: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { phone: { contains: search, mode: 'insensitive' } },
                        ],
                    },
                }),
            ]);
            return {
                data,
                total,
                page,
                lastPage: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Konsultatsiyalarni olishda xatolik yuz berdi');
        }
    }
    async findOne(id) {
        try {
            const consultation = await this.prisma.consultation.findFirst({
                where: { id },
            });
            if (!consultation) {
                throw new common_1.NotFoundException(`ID ${id} bo‘yicha konsultatsiya topilmadi`);
            }
            return consultation;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Konsultatsiyani olishda xatolik yuz berdi');
        }
    }
    async update(id, updateConsultationDto) {
        try {
            const consultation = await this.prisma.consultation.findFirst({
                where: { id },
            });
            if (!consultation) {
                throw new common_1.NotFoundException(`ID ${id} bo‘yicha konsultatsiya topilmadi`);
            }
            return await this.prisma.consultation.update({
                where: { id },
                data: updateConsultationDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Konsultatsiyani yangilashda xatolik yuz berdi');
        }
    }
    async remove(id) {
        try {
            const consultation = await this.prisma.consultation.findFirst({
                where: { id },
            });
            if (!consultation) {
                throw new common_1.NotFoundException(`ID ${id} bo‘yicha konsultatsiya topilmadi`);
            }
            return await this.prisma.consultation.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Konsultatsiyani o‘chirishda xatolik yuz berdi');
        }
    }
};
exports.ConsultationService = ConsultationService;
exports.ConsultationService = ConsultationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ConsultationService);
//# sourceMappingURL=consultation.service.js.map