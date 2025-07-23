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
exports.MulterController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_service_1 = require("./multer.service");
const swagger_1 = require("@nestjs/swagger");
const path = require("path");
const fs = require("fs");
let MulterController = class MulterController {
    multerService;
    constructor(multerService) {
        this.multerService = multerService;
    }
    uploadFile(file) {
        return this.multerService.create(file);
    }
    async getFile(filename, res) {
        const filePath = path.join('./uploads', filename);
        if (!fs.existsSync(filePath)) {
            filePath;
            return this.multerService.findOne(filePath);
        }
        res.sendFile(filePath, { root: '.' });
    }
    deleteFile(filename) {
        return this.multerService.remove(filename);
    }
};
exports.MulterController = MulterController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an image' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', new multer_service_1.MulterService().getMulterConfig())),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MulterController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':filename'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve an image' }),
    (0, swagger_1.ApiParam)({ name: 'filename', description: 'Name of the file to retrieve' }),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MulterController.prototype, "getFile", null);
__decorate([
    (0, common_1.Delete)(':filename'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an image' }),
    (0, swagger_1.ApiParam)({ name: 'filename', description: 'Name of the file to delete' }),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MulterController.prototype, "deleteFile", null);
exports.MulterController = MulterController = __decorate([
    (0, swagger_1.ApiTags)('Multer'),
    (0, common_1.Controller)('multer'),
    __metadata("design:paramtypes", [multer_service_1.MulterService])
], MulterController);
//# sourceMappingURL=multer.controller.js.map