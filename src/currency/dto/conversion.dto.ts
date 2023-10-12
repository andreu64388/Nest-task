import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the currency' })
  fromCurrency: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The exchange rate to USD' })
  amount: number;
}
