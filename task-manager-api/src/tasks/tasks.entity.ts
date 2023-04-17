import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
import { User } from '../users/user.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'text',
  })
  title: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  date: string;
  @Column({
    type: 'longtext',
  })
  description: string;
  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.normal,
  })
  priority: Priority;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.todo,
  })
  status: Status;
  @ManyToOne(() => User, user => user.tasks)
  user: User;
}
