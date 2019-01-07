import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/browser';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
}
