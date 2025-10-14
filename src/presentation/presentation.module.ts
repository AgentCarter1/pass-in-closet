import { Global, Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
@Global()
@Module({
  imports: [ControllerModule],
})
export class PresentationModule {}
