
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateIssueDto } from './create-issue.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { IssueStates, UpdateIssueStates } from '../enums/issue-states.enum';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
  @ApiProperty({ description: 'The state of the issue', example: 'pending' })
  @IsOptional()
  @IsEnum(UpdateIssueStates)
  state?: IssueStates
}
