import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/browser';
import { Task } from './task';

@Entity()
export class TaskComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Task)
  task: Task;

  @Column()
  text: string;
}
