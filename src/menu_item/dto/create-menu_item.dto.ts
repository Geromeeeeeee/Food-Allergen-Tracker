export class CreateMenuItemDto {
    business_id: number;
    item_name: string;
    description: string;
    price: number;
    allergen_ids?: number[];
}
