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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const roles_guard_1 = require("../Guards/roles.guard");
const auth_guard_1 = require("../Guards/auth.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_enum_1 = require("../auth/enum/role.enum");
const swagger_1 = require("@nestjs/swagger");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    findAll(page, limit, name) {
        return this.categoryService.findAll({ page, limit, name });
    }
    findOne(id) {
        return this.categoryService.findOne(+id);
    }
    update(id, updateCategoryDto) {
        return this.categoryService.update(+id, updateCategoryDto);
    }
    remove(id) {
        return this.categoryService.remove(+id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, roles_decorator_1.RoleDec)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPER_ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Kategoriya yaratish' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Kategoriya muvaffaqiyatli yaratildi',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Barcha kategoriyalarni olish (paginatsiya + filter)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kategoriyalar ro‘yxati qaytarildi',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({
        name: 'name',
        required: false,
        type: String,
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Kategoriya ID orqali olish' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategoriya topildi' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Kategoriyani yangilash' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kategoriya muvaffaqiyatli yangilandi',
    }),
    (0, roles_decorator_1.RoleDec)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPER_ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Kategoriyani o‘chirish' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kategoriya muvaffaqiyatli o‘chirildi',
    }),
    (0, roles_decorator_1.RoleDec)(role_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Category'),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map