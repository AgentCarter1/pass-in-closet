import { Injectable } from '@nestjs/common';
import { AppEnvironmentConfigService } from './services/app.environment-config.service';
import { DatabaseEnvironmentConfigService } from './services/database.environment-config.service';
import { TokeneEnvironmentConfigService } from './services/token.environment-config.service';

@Injectable()
export class EnvironmentConfigService {
  public constructor(
    public readonly appEnvironmentConfigService: AppEnvironmentConfigService,
    public readonly databaseEnvironmentConfigService: DatabaseEnvironmentConfigService,
    public readonly tokeneEnvironmentConfigService: TokeneEnvironmentConfigService,
  ) {}
}
