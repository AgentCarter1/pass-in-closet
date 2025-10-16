export class CredentialModel {
  public readonly id?: string;
  public readonly name: string | null;
  public readonly link: string | null;
  public readonly email: string | null;
  public readonly password: string | null;
  public readonly credentialGroupId: string | null;
  public readonly createdAt: Date | null;
  public readonly updatedAt: Date | null;
  public readonly deletedAt: Date | null;

  constructor(props: Partial<CredentialModel> = {}) {
    this.id = props.id;
    this.name = props.name ?? null;
    this.link = props.link ?? null;
    this.email = props.email ?? null;
    this.password = props.password ?? null;
    this.credentialGroupId = props.credentialGroupId ?? null;
    this.createdAt = props.createdAt ?? null;
    this.updatedAt = props.updatedAt ?? null;
    this.deletedAt = props.deletedAt ?? null;
  }
}
