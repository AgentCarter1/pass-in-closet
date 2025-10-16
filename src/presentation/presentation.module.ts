import { Global, Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { GuardPresentationModule } from './guards/guard.presentation.module';
@Global()
@Module({
  imports: [GuardPresentationModule, ControllerModule],
})
export class PresentationModule {}
