import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/tasks.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}
