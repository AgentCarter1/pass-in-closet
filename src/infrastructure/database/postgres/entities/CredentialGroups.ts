import { Column, Entity, Index, OneToMany } from "typeorm";
import { AccountHasCredentialGroups } from "./AccountHasCredentialGroups";
import { Credentials } from "./Credentials";

@Index("pk_credential_group_id", ["id"], { unique: true })
@Entity("credential_groups", { schema: "public" })
export class CredentialGroups {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

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

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => AccountHasCredentialGroups,
    (accountHasCredentialGroups) => accountHasCredentialGroups.credentialGroup
  )
  accountHasCredentialGroups: AccountHasCredentialGroups[];

  @OneToMany(() => Credentials, (credentials) => credentials.credentialGroup)
  credentials: Credentials[];
}
