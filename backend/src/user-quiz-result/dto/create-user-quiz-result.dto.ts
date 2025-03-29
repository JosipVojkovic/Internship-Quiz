import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserQuizResultDto {
  @ApiProperty({
    example: 4,
    description: 'Score of the user in the quiz',
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @ApiProperty({ description: 'User ID', type: 'string' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Quiz ID', type: 'string' })
  @IsNotEmpty()
  @IsString()
  quizId: string;
}
