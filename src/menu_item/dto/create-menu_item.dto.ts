import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class CreateMenuItemDto {
    @IsNumber()
    business_id: number;

    @IsString()
    @IsNotEmpty()
    item_name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    allergen_ids?: number[];
}