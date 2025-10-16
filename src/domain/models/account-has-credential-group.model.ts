export class AccountHasCredentialGroupModel {
  public readonly id?: string;
  public readonly accountId: string | null;
  public readonly credentialGroupId: string | null;
  public readonly createdAt?: Date | null;
  public readonly updatedAt?: Date | null;

  constructor(props: Partial<AccountHasCredentialGroupModel> = {}) {
    this.id = props.id;
    this.accountId = props.accountId ?? null;
    this.credentialGroupId = props.credentialGroupId ?? null;
    this.createdAt = props.createdAt ?? null;
    this.updatedAt = props.updatedAt ?? null;
  }
}
