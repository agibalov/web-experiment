import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/browser';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
}
