import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IssueStates } from '../enums/issue-states.enum';

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_TITLE', { fulltext: true })
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 'open' })
  state: IssueStates;
}
