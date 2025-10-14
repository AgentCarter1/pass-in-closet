import { Global, Module } from '@nestjs/common';
import { AuthUseCaseModule } from './auth/auth.use-case.module';

const modules = [AuthUseCaseModule];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class UseCaseModule {}
