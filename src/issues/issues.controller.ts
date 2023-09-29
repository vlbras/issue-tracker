import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './entities/issue.entity';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() createIssueDto: CreateIssueDto): Promise<Issue> {
    return this.issuesService.create(createIssueDto);
  }

  @Get()
  findAll(@Query('title') title?: string): Promise<Issue[]> {
    return this.issuesService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Issue> {
    return this.issuesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateIssueDto: UpdateIssueDto,
  ): Promise<Issue> {
    return this.issuesService.update(id, updateIssueDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Issue> {
    return this.issuesService.remove(id);
  }
}
