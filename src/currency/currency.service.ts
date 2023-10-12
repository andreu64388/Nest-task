  import {
    ConflictException,
    NotFoundException,
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Currency } from './entities/currency.entity';
  import { CreateCurrencyDto } from './dto/create-currency.dto';

  @Injectable()
  export class CurrencyService {
    constructor(
      @InjectRepository(Currency)
      private readonly currencyRepository: Repository<Currency>,
    ) {}

    async getAllCurrencies(name: string, value: number): Promise<Currency[]> {
      try {
        const currencies = await this.currencyRepository.find();
        const targetCurrency = currencies.find(
          (currency) => currency.name === name,
        );

        if (!targetCurrency) {
          throw new NotFoundException(`Currency ${name} not found.`);
        }

        const convertedCurrencies = currencies.map((currency) => ({
          id: currency.id,
          name: currency.name,
          value: parseFloat(
            ((value / targetCurrency.value) * currency.value).toFixed(2),
          ),
        }));

        return convertedCurrencies;
      } catch (error) {
        throw new ConflictException(error.message);
      }
    }

    async addCurrency(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
      try {
        const { name } = createCurrencyDto;

        const existingCurrency = await this.currencyRepository.findOne({
          where: { name },
        });

        if (existingCurrency) {
          throw new ConflictException(
            `Currency with code '${name}' already exists.`,
          );
        }

        const currency = this.currencyRepository.create(createCurrencyDto);
        return this.currencyRepository.save(currency);
      } catch (error) {
        throw new ConflictException(error.message);
      }
    }

    async deleteCurrency(id: number) {
      try {
        const currency = await this.currencyRepository.findOne({ where: { id } });

        if (!currency) {
          throw new NotFoundException(`Currency with id '${id}' not found.`);
        }

        return this.currencyRepository.delete(id);
      } catch (error) {
        throw new ConflictException(error.message);
      }
    }

    async getAllCurrencyConversions(sort?: string, order?: string) {
      try {
        const currencies = await this.currencyRepository.find();
        const convertedCurrencies = currencies.map((currency) => ({
          id: currency.id,
          name: currency.name,
          value: parseFloat((1 / currency.value).toFixed(2)),
        }));

        if (sort === 'NAME') {
          convertedCurrencies.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'VALUE') {
          convertedCurrencies.sort((a, b) => a.value - b.value);
        }

        if (order === 'DESC') {
          convertedCurrencies.reverse();
        }

        return convertedCurrencies;
      } catch (error) {
        throw new ConflictException(error.message);
      }
    }
  }
