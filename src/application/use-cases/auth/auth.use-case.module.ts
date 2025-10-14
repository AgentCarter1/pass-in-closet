import { Global, Module } from '@nestjs/common';
import { SignUpCommandUseCase } from './command/sign-up.command.use-case';
import { LoginCommandUseCase } from './command/log-in.command.use-case';

const query = [];
const command = [SignUpCommandUseCase, LoginCommandUseCase];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class AuthUseCaseModule {}
