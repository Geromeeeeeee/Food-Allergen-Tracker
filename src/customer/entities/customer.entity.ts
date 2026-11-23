import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn()
    customer_id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    email: string;

    @Column()
    password: string;
}

