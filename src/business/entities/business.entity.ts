import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BusinessOwner } from "../../business_owner/entities/business_owner.entity.js";

@Entity('business')
export class Business {
    @PrimaryGeneratedColumn()
    business_id: number;

    @Column()
    business_name: string;

    @Column()
    location: string;

    @Column()
    owner_id: number;

    @ManyToOne(()=>BusinessOwner, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'owner_id'})
    owner: BusinessOwner
}
