import { IsNotEmpty } from 'class-validator';

export class CreateProjectDTO {
  @IsNotEmpty()
  name: string;
}
