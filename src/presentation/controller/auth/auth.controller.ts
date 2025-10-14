import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LogInRequestBodyDto } from 'src/application/dto/command/request/log-in.request.body.dto';
import { SignUpRequestDto } from 'src/application/dto/command/request/sign-up.request.body.dto';
import { LogInResponseDto } from 'src/application/dto/command/response/log-in.response.dto';
import { SignUpResponseDto } from 'src/application/dto/command/response/sign-up.response.dto';
import { LoginCommandUseCase } from 'src/application/use-cases/auth/command/log-in.command.use-case';
import { SignUpCommandUseCase } from 'src/application/use-cases/auth/command/sign-up.command.use-case';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly signUpCommandUseCase: SignUpCommandUseCase,
    private readonly loginCommandUseCase: LoginCommandUseCase,
  ) {}

  @ApiCreatedResponse({
    description: 'Successful',
    type: SignUpResponseDto,
  })
  @Post('sign-up')
  public async signUp(
    @Body() Body: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    return this.signUpCommandUseCase.execute(Body);
  }

  @ApiCreatedResponse({
    description: 'Successful',
    type: LogInResponseDto,
  })
  @Post('log-in')
  public async logIn(
    @Body() Body: LogInRequestBodyDto,
  ): Promise<LogInResponseDto> {
    return this.loginCommandUseCase.execute(Body);
  }
}
