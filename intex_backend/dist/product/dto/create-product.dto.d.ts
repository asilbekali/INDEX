declare enum Frame {
    circle = "circle",
    square = "square"
}
declare enum Status {
    recomend = "recomend",
    discount = "discount",
    end = "end"
}
export declare class CreateProductDto {
    name: string;
    image: string;
    price: number;
    frame: Frame;
    size: number;
    status: Status;
    count: number;
    discount: number;
    tall: number;
    categoryId: number;
}
export {};
