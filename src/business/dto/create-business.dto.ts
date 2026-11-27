import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBusinessDto {
    @IsNotEmpty()
    @IsNumber()
    owner_id: number;

    @IsNotEmpty()
    @IsString()
    business_name: string;

    @IsNotEmpty()
    @IsString()
    location: string;
}
