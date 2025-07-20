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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        const existing = await this.prisma.category.findFirst({
            where: { name: createCategoryDto.name },
        });
        if (existing) {
            throw new common_1.BadRequestException('Bu nomdagi kategoriya allaqachon mavjud');
        }
        return this.prisma.category.create({
            data: createCategoryDto,
        });
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const where = query.name
            ? {
                name: {
                    contains: query.name,
                    mode: client_1.Prisma.QueryMode.insensitive,
                },
            }
            : {};
        const [categories, total] = await Promise.all([
            this.prisma.category.findMany({
                where,
                skip,
                take: limit,
                orderBy: { name: 'asc' },
            }),
            this.prisma.category.count({ where }),
        ]);
        return {
            data: categories,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const category = await this.prisma.category.findFirst({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException(`ID ${id} bo‘yicha kategoriya topilmadi`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const existing = await this.prisma.category.findFirst({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`ID ${id} bo‘yicha kategoriya topilmadi`);
        }
        return this.prisma.category.update({
            where: { id },
            data: updateCategoryDto,
        });
    }
    async remove(id) {
        const existing = await this.prisma.category.findFirst({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`ID ${id} bo‘yicha kategoriya topilmadi`);
        }
        return this.prisma.category.delete({
            where: { id },
        });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map