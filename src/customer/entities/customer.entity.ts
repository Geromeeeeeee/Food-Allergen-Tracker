import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Allergen } from "../../allergen/entities/allergen.entity.js";

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

    @Column({select: false})
    password: string;

    @ManyToMany(()=> Allergen, (allergen) => allergen.customers, {cascade: true})
    @JoinTable({
        name: "customer_allergen",
        joinColumn: {name: 'customer_id', referencedColumnName: 'customer_id'},
        inverseJoinColumn: {name: 'allergen_id', referencedColumnName: 'allergen_id'}
    })
    allergens: Allergen[]
}

