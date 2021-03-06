import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserDetails } from './userDetails.entity';
import { Role } from '../role/role.entity';
import { status } from '../../shared/status.enum';
import { Book } from '../book/book.entity';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne(type => UserDetails, { cascade: true, nullable: false, eager: true })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;

  @ManyToMany(type => Role, ({ users }) => users, { eager: true })
  @JoinTable()
  roles: Role[];

  @ManyToMany(type => Book, ({ id }) => id)
  @JoinTable()
  books: Book[];

  @Column({ type: 'varchar', default: status.ACTIVE, length: '8' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

}