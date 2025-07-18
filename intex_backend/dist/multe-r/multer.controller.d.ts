import { MulterService } from './multer.service';
import { Response } from 'express';
export declare class MulterController {
    private readonly multerService;
    constructor(multerService: MulterService);
    uploadFile(file: Express.Multer.File): {
        message: string;
        path: string;
    };
    getFile(filename: string, res: Response): Promise<{
        message: string;
        path: string;
    } | undefined>;
    deleteFile(filename: string): {
        message: string;
    };
}
