# Currency Converter App

[Currency Converter App](https://react-task-sage-three.vercel.app/)

This is a currency converter application built using the Nest.js, TypeScript, Postgres, React, and Redux Toolkit stack.

## Features

- Currency conversion from one currency to another.
- User-friendly interface with a responsive design.

## Main Module: Currency

The main module of this application is the `currency` module, where all the currency conversion logic is implemented. The core data structure used for currencies is defined in the `entities` folder using TypeORM. Here is the `Currency` entity:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  value: number;
}
```

## Documentation

We use Swagger for documenting the API. You can explore the API documentation by visiting the following endpoint: `/api/`.

## Project Structure

In the `currency` module, you will find a structured architecture for handling currency-related functionality. Here's a breakdown of the key components:

- **Controllers**: The controllers in the `currency` module accept incoming requests and handle the routing.

- **Services**: The services in the `currency` module process the requests, apply business logic, and interact with the database. 

- **Entities**: The data model for currencies is defined in the `entities` folder using TypeORM.

The modular structure makes it easy to manage and scale the currency-related functionality of the application.

Feel free to explore the code in the `currency` module to understand how these components work together to handle currency conversion and related operations.



