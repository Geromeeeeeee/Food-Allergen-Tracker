export class CreateCustomerDto {
    fname: string;
    lname: string;
    email: string;
    password: string;
    allergen_ids?: number[]
}
