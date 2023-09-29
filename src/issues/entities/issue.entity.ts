import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IssueStates } from '../enums/issue-states.enum';

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 'open' })
  state: IssueStates;
}
