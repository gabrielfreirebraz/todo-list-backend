import { IsNotEmpty } from 'class-validator';

export class CreateToDoDTO {
  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  title: string;
}
