import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: 'string', required: true, example: 'test@test.com' })
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'ea9e83d436874ff09f7ab1b51e0139ff812d2142775c895b2bbc5783eb0e5d55',
  })
  authToken: string;
}
