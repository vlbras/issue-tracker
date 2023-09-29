
import { PartialType } from '@nestjs/mapped-types';
import { CreateIssueDto } from './create-issue.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { IssueStates, UpdateIssueStates } from '../enums/issue-states.enum';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
  @IsOptional()
  @IsEnum(UpdateIssueStates)
  state?: IssueStates
}
