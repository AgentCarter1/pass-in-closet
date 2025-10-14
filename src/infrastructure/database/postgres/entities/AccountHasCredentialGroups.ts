import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accounts } from "./Accounts";
import { CredentialGroups } from "./CredentialGroups";

@Index(
  "index_account_id_credential_group_id",
  ["accountId", "credentialGroupId"],
  { unique: true }
)
@Index("pk_account_has_credential_groups_id", ["id"], { unique: true })
@Entity("account_has_credential_groups", { schema: "public" })
export class AccountHasCredentialGroups {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "account_id", nullable: true })
  accountId: string | null;

  @Column("uuid", { name: "credential_group_id", nullable: true })
  credentialGroupId: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @ManyToOne(
    () => Accounts,
    (accounts) => accounts.accountHasCredentialGroups,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(
    () => CredentialGroups,
    (credentialGroups) => credentialGroups.accountHasCredentialGroups,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "credential_group_id", referencedColumnName: "id" }])
  credentialGroup: CredentialGroups;
}
