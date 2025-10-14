import { Module } from '@nestjs/common';
import { PostgresConfig } from './postgres.config';

@Module({
  imports: [PostgresConfig],
})
export class PostgresModule {}
