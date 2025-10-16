import { Global, Module } from '@nestjs/common';
import { IAccountHasCredentialGroupsRepository } from 'src/domain/repositories/account-has-credential-groups.repository.interface';
import { AccountHasCredentialGroupRepository } from './account-has-credential-group.repository';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { AccountRepository } from './account.repository';
import { ICredentialGroupsRepository } from 'src/domain/repositories/credential-groups.repository.interface';
import { CredentialGroupRepository } from './credential-group.repository';
import { ICredentialsRepository } from 'src/domain/repositories/credentials.repository.interface';
import { CredentialRepository } from './credential.repository';

const providers = [
  {
    provide: IAccountHasCredentialGroupsRepository,
    useClass: AccountHasCredentialGroupRepository,
  },
  {
    provide: IAccountRepository,
    useClass: AccountRepository,
  },
  {
    provide: ICredentialGroupsRepository,
    useClass: CredentialGroupRepository,
  },
  {
    provide: ICredentialsRepository,
    useClass: CredentialRepository,
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class RepositoriesModule {}
