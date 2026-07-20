import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ default: false })
  isDefault: boolean;

  @Column('json')
  translations: Record<string, string>;

  @CreateDateColumn()
  createdAt: Date;
}
