import { Global, Module } from '@nestjs/common';
import { SignUpCommandUseCase } from './command/sign-up.command.use-case';

const query = [];
const command = [SignUpCommandUseCase];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class AuthUseCaseModule {}
