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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: createOrderDto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Bunday product topilmadi!');
        }
        return this.prisma.order.create({
            data: {
                userName: createOrderDto.userName,
                userPhone: createOrderDto.userPhone,
                userLocation: createOrderDto.userLocation,
                product: {
                    connect: { id: createOrderDto.productId },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.order.findMany({
            include: {
                product: true,
            },
        });
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { product: true },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Buyurtma topilmadi (id: ${id})`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!existingOrder) {
            throw new common_1.NotFoundException(`Bunday buyurtma mavjud emas (id: ${id})`);
        }
        if (updateOrderDto.productId) {
            const product = await this.prisma.product.findUnique({
                where: { id: updateOrderDto.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException('Yangilash uchun berilgan productId mavjud emas');
            }
        }
        const updateData = {
            userName: updateOrderDto.userName,
            userPhone: updateOrderDto.userPhone,
            userLocation: updateOrderDto.userLocation,
        };
        if (updateOrderDto.productId) {
            updateData.product = {
                connect: { id: updateOrderDto.productId },
            };
        }
        return this.prisma.order.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!existingOrder) {
            throw new common_1.NotFoundException(`O‘chirish uchun buyurtma topilmadi (id: ${id})`);
        }
        return this.prisma.order.delete({
            where: { id },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map