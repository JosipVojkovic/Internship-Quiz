import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @ApiProperty({
    example: 'Football quiz',
    description: 'Quiz title',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emirates_Stadium_Arsenal.jpg',
    description: 'Quiz image URL',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  img?: string;

  @ApiProperty({ description: 'Quiz ID', type: 'string' })
  @IsOptional()
  categoryId?: string;
}
