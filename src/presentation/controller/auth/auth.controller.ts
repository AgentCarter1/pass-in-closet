import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestDto } from 'src/application/dto/command/request/sign-up.command.request.body.dto';
import { SignUpResponseDto } from 'src/application/dto/command/response/sign-up.response.dto';
import { SignUpCommandUseCase } from 'src/application/use-cases/auth/command/sign-up.command.use-case';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly signUpCommandUseCase: SignUpCommandUseCase,
  ) {}

  @Post('sign-up')
  public async getAccountInfo(
    @Body() Body: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    return this.signUpCommandUseCase.execute(Body);
  }
}
