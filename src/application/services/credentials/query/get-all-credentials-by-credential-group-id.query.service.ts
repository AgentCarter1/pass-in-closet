import { Injectable, Inject } from '@nestjs/common';
import { ICredentialsRepository } from 'src/domain/repositories/credentials.repository.interface';
import { CredentialModel } from 'src/domain/models/credential.model';

@Injectable()
export class GetAllCredentialsByCredentialGroupIdQueryService {
  public constructor(
    @Inject(ICredentialsRepository)
    public readonly credentialsRepository: ICredentialsRepository,
  ) {}

  public async execute(credentialGroupId: string): Promise<CredentialModel[]> {
    // Get credentials that belong to the credential group
    const query = `
      SELECT c.* FROM credentials c
      WHERE c.credential_group_id = $1 AND c.deleted_at IS NULL
      ORDER BY c.created_at DESC
    `;

    const result = await this.credentialsRepository.query(query, [
      credentialGroupId,
    ]);

    // Convert to CredentialModel
    return result.map(
      (row: any) =>
        new CredentialModel({
          id: row.id,
          name: row.name,
          link: row.link,
          email: row.email,
          password: row.password,
          credentialGroupId: row.credential_group_id,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          deletedAt: row.deleted_at,
        }),
    );
  }
}
