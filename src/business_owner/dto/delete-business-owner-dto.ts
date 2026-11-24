import { IsString, IsNotEmpty } from "class-validator";

export class DeleteBusinessOwnerDto{
    @IsNotEmpty()
    @IsString()
    currentPassword: string
}