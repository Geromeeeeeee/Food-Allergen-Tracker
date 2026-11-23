import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('business_owner')
export class BusinessOwner {
    @PrimaryGeneratedColumn()
    owner_id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    email: string;

    @Column()
    password: string
}
