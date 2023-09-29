import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateIssueDto {
  @ApiProperty({ description: 'The title of the issue', example: 'Issue title'})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the issue', example: 'Issue description'})
  @IsString()
  @IsNotEmpty()
  description: string;
}
