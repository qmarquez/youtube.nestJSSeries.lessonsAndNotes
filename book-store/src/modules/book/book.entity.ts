import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, Entity, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { status } from "../../shared/status.enum";

@Entity('books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @ManyToMany(() => User, ({ books }) => books, { eager: true })
  @JoinColumn()
  authors: User[];

  @Column({ type: 'varchar', default: status.ACTIVE, length: '8' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}