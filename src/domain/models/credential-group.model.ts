export class CredentialGroupModel {
  public readonly id?: string;
  public readonly name: string | null;
  public readonly createdAt?: Date | null;
  public readonly updatedAt?: Date | null;
  public readonly deletedAt?: Date | null;

  constructor(props: Partial<CredentialGroupModel> = {}) {
    this.id = props.id;
    this.name = props.name ?? null;
    this.createdAt = props.createdAt ?? null;
    this.updatedAt = props.updatedAt ?? null;
    this.deletedAt = props.deletedAt ?? null;
  }
}
