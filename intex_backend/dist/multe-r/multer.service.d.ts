export declare class MulterService {
    private readonly uploadPath;
    getMulterConfig(): {
        storage: import("multer").StorageEngine;
        fileFilter: (req: any, file: any, callback: any) => any;
        limits: {
            fileSize: number;
        };
    };
    create(file: Express.Multer.File): {
        message: string;
        path: string;
    };
    findOne(filename: string): {
        message: string;
        path: string;
    };
    remove(filename: string): {
        message: string;
    };
}
