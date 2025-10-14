import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RepositoriesModule } from './repositories/repositories.model';

@Global()
@Module({
  imports: [DatabaseModule, RepositoriesModule],
  providers: [DatabaseModule, RepositoriesModule],
})
export class InfrastructureModule {}
