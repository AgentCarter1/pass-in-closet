import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';

@Global()
@Module({
  controllers: [AuthController],
})
export class ControllerModule {}
