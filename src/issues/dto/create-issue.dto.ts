import { IsNotEmpty, IsString } from "class-validator";

export class CreateIssueDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
