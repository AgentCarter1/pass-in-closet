import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInRequestBodyDto } from 'src/application/dto/auth/request/log-in.request.body.dto';
import { LogInResponseDto } from 'src/application/dto/auth/response/log-in.response.dto';
import { UpdateAccountCommandService } from 'src/application/services/account/command/account/update-accont.command.service';
import { GetOneAccountByFilterBaseQueryService } from 'src/application/services/account/query/account/get-one-account-by-filter.service';
import { BcryptHashingService } from 'src/application/services/bcrypt/bcrypt-hashing.service';
import { TokenService } from 'src/application/services/token/token.service';
import { AccountModel } from 'src/domain/models/account.model';

@Injectable()
export class LoginCommandUseCase {
  constructor(
    private readonly getOneAccountByFilterBaseQueryService: GetOneAccountByFilterBaseQueryService,
    private readonly updateAccountCommandService: UpdateAccountCommandService,
    private readonly bcryptHashingService: BcryptHashingService,
    private readonly tokenService: TokenService,
  ) {}

  public async execute(body: LogInRequestBodyDto): Promise<LogInResponseDto> {
    const { email, password } = body;
    const account: AccountModel | null =
      await this.getOneAccountByFilterBaseQueryService.execute({
        email,
      });

    if (!account) throw new UnauthorizedException('Invalid credentials');

    const isCompare: boolean = await this.bcryptHashingService.compare(
      password,
      account.password!,
    );

    if (!isCompare) throw new UnauthorizedException('Invalid credentials');

    const accessToken: string = this.tokenService.createAccessToken({
      accountId: account.id,
      email: account.email,
    });

    const refreshToken: string = this.tokenService.createAccessToken({
      accountId: account.id,
      email: account.email,
    });

    await this.updateAccountCommandService.execute(
      { id: account.id },
      { ...account, accessToken, refreshToken },
    );

    return new LogInResponseDto({ accessToken, refreshToken });
  }
}
