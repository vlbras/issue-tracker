import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: Repository<Issue>,
  ) {}

  create(createIssueDto: CreateIssueDto): Promise<Issue> {
    const issue = this.issuesRepository.create(createIssueDto);
    return this.issuesRepository.save(issue);
  }

  findAll(title: string): Promise<Issue[]> {
    if (title) {
      return this.issuesRepository
        .createQueryBuilder('issues')
        .where('MATCH(issues.title) AGAINST(:title IN BOOLEAN MODE)', {
          title: `+"${title}"`,
        })
        .getMany();
    }

    return this.issuesRepository.find();
  }

  async findOne(id: string): Promise<Issue> {
    const issue = await this.issuesRepository.findOneBy({ id });

    if (!issue) {
      throw new NotFoundException(`Issue #${id} not found`);
    }

    return issue;
  }

  async update(id: string, updateIssueDto: UpdateIssueDto): Promise<Issue> {
    const issue = await this.findOne(id);

    if (updateIssueDto.state == 'pending' && issue.state === 'closed') {
      throw new BadRequestException(
        `Once an issue is closed it cannot be set back to pending`,
      );
    }

    const updatedIssue = this.issuesRepository.merge(issue, updateIssueDto);
    return this.issuesRepository.save(updatedIssue);
  }

  async remove(id: string): Promise<Issue> {
    const issue = await this.findOne(id);
    return this.issuesRepository.remove(issue);
  }
}
