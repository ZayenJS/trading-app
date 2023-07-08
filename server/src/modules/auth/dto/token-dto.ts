import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ type: 'string', required: true, example: 'test@test.com' })
  email: string;
}
