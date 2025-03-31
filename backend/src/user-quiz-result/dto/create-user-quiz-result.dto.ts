import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserQuizResultDto {
  @ApiProperty({
    example: 4,
    description: 'Score of the user in the quiz',
    type: 'number',
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: 'Score must be a number' },
  )
  @IsNotEmpty({ message: 'Score is required' })
  score: number;

  @ApiProperty({ description: 'User ID', type: 'string' })
  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @ApiProperty({ description: 'Quiz ID', type: 'string' })
  @IsString({ message: 'Quiz ID must be a string' })
  @IsNotEmpty({ message: 'Quiz ID is required' })
  quizId: string;
}
