import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: 'string', example: 'John' })
  firstName: string;
  @ApiProperty({ type: 'string', example: 'Doe' })
  lastName: string;
  @ApiProperty({ type: 'string', example: 'johndoe' })
  username: string;
  @ApiProperty({ type: 'string', example: 'test@test.com' })
  email: string;
}
