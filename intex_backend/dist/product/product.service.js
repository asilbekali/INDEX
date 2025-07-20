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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const category = await this.prisma.category.findFirst({
            where: { id: dto.categoryId },
        });
        if (!category)
            throw new common_1.BadRequestException('Invalid category ID');
        const existing = await this.prisma.product.findFirst({
            where: { name: dto.name },
        });
        if (existing)
            throw new common_1.BadRequestException('Product with this name already exists');
        return this.prisma.product.create({ data: dto });
    }
    async findAll(limit = 10, page = 1, search) {
        const skip = (page - 1) * limit;
        const where = search
            ? { name: { contains: search, mode: 'insensitive' } }
            : {};
        const [data, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({ where, skip, take: limit }),
            this.prisma.product.count({ where }),
        ]);
        return { data, total, page, lastPage: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const product = await this.prisma.product.findFirst({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async update(id, dto) {
        const product = await this.prisma.product.findFirst({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (dto.categoryId) {
            const category = await this.prisma.category.findFirst({
                where: { id: dto.categoryId },
            });
            if (!category)
                throw new common_1.BadRequestException('Invalid category ID');
        }
        return this.prisma.product.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const product = await this.prisma.product.findFirst({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return this.prisma.product.delete({ where: { id } });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map