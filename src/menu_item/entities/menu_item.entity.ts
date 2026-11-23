import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Business } from "../../business/entities/business.entity.js";
import { Allergen } from "../../allergen/entities/allergen.entity.js";

@Entity('menu_item')
export class MenuItem {
    @PrimaryGeneratedColumn()
    menu_id: number;

    @Column()
    item_name: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column()
    business_id: number;

    @ManyToOne(()=> Business, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'business_id'})
    business: Business

    //Joint (pivot? ewan) table part para sa allergen and menu item relation
    @ManyToMany(()=>Allergen,(allergen)=>allergen.menuItems, {cascade: true})
    @JoinTable({
        name: 'menu_item_allergen',
        joinColumn:{name: 'menu_id', referencedColumnName: 'menu_id'},
        inverseJoinColumn:{name:'allergen_id', referencedColumnName: 'allergen_id'}
    })
    allergens: Allergen[]
}
