import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseEnvironmentConfig } from 'src/domain/environment-config/database.environment-config.interface';

@Injectable()
export class DatabaseEnvironmentConfigService
  implements IDatabaseEnvironmentConfig
{
  public constructor(private readonly configService: ConfigService) {}

  public getDatabaseHost(): string | undefined {
    return this.configService.get<string>('DATABASE_HOST');
  }

  public getDatabasePort(): number | undefined {
    return this.configService.get<number>('DATABASE_PORT');
  }

  public getDatabaseUser(): string | undefined {
    return this.configService.get<string>('DATABASE_USER');
  }

  public getDatabasePassword(): string | undefined {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  public getDatabaseName(): string | undefined {
    return this.configService.get<string>('DATABASE_NAME');
  }

  public getDatabaseSynchronize(): boolean | undefined {
    const databaseSync = this.configService.get<string>('DATABASE_SYNCHRONIZE');
    return databaseSync !== undefined ? JSON.parse(databaseSync) : undefined;
  }

  public getDatabaseLogging(): boolean | undefined {
    const databaseLogging = this.configService.get<string>('DATABASE_LOGGING');
    return databaseLogging !== undefined
      ? JSON.parse(databaseLogging)
      : undefined;
  }

  public getMongoDbConnectionStr(): string | undefined {
    return this.configService.get<string>('MONGODB_CONNECTION');
  }

  public getMongoDbName(): string | undefined {
    return this.configService.get<string>('MONGODB_NAME');
  }
}
