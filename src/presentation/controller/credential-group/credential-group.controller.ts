import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SkipAccessToken } from 'src/presentation/decorators/skip-access-token.decorator';

@ApiBearerAuth()
@Controller('credential-groups')
export class CredentialGroupController {
  public constructor() {}

  @Post()
  public async signUp(): Promise<any> {
    return 'this.signUpCommandUseCase.execute(Body);';
  }
}
