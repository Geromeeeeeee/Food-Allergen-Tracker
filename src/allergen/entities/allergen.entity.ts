import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { MenuItem } from '../../menu_item/entities/menu_item.entity.js';

@Entity('allergens')
export class Allergen {
  @PrimaryGeneratedColumn()
  allergen_id: number;

  @Column()
  allergen_name: string;

  @Column()
  description: string;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.allergens)
  menuItems: MenuItem[];
}