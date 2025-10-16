import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EnvironmentConfigService } from 'src/application/environment-config/environment-config.service';

@Injectable()
export class BcryptHashingService {
  public constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  public async hash(plain: string): Promise<string> {
    return bcrypt.hash(
      plain,
      Number(
        this.environmentConfigService.appEnvironmentConfigService.getSaltRound(),
      ),
    );
  }

  public async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
