import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the currency' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The value of the currency' })
  value: number;
}
