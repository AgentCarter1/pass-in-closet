import { Global, Module } from '@nestjs/common';
import { AuthGuardModule } from './auth/auth.guard.module';

const guardModules = [AuthGuardModule];

@Global()
@Module({
  imports: [...guardModules],
  exports: [...guardModules],
})
export class GuardPresentationModule {}
