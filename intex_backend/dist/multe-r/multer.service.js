"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterService = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = require("fs");
const path = require("path");
let MulterService = class MulterService {
    uploadPath = './uploads';
    getMulterConfig() {
        return {
            storage: (0, multer_1.diskStorage)({
                destination: this.uploadPath,
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const fileExtension = (0, path_1.extname)(file.originalname);
                    const fileName = `${file.originalname.split('.')[0]}-${uniqueSuffix}${fileExtension}`;
                    callback(null, fileName);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    return callback(new Error('Only image files are allowed!'), false);
                }
                callback(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
        };
    }
    create(file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        const imagePath = `${file.filename}`;
        return { message: 'File uploaded successfully', path: imagePath };
    }
    findOne(filename) {
        filename;
        const filePath = path.join(this.uploadPath, filename);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('File not found');
        }
        return { message: 'File found !', path: filePath };
    }
    remove(filename) {
        const filePath = path.join(this.uploadPath, filename);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('File not found');
        }
        fs.unlinkSync(filePath);
        return { message: 'File deleted successfully' };
    }
};
exports.MulterService = MulterService;
exports.MulterService = MulterService = __decorate([
    (0, common_1.Injectable)()
], MulterService);
//# sourceMappingURL=multer.service.js.map