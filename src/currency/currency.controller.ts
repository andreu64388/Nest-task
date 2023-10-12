import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import {  ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('currencies')
@ApiTags('Currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all currencies' })
  async getAllCurrencies(@Query('name') name: string, @Query('value') value: number,
  ): Promise<Currency[]> {
    return await this.currencyService.getAllCurrencies(name, value);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new currency' })
  async addCurrency(@Body() createCurrencyDto: CreateCurrencyDto,
  ): Promise<Currency> {
    return await this.currencyService.addCurrency(createCurrencyDto);
  }

  @Get('conversions')
  @ApiOperation({ summary: 'Get currency conversions' })
  async getAllCurrencyConversions(@Query('sort') sort: string, @Query('order') order: string,
  ) {
   return await this.currencyService.getAllCurrencyConversions(sort, order);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a currency by ID' })
  async deleteCurrency(@Param('id') id: number) {
    return await this.currencyService.deleteCurrency(id);
  }
}
