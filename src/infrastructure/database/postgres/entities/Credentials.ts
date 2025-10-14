import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CredentialGroups } from "./CredentialGroups";

@Index("index_id_credential_group_id", ["credentialGroupId", "id"], {
  unique: true,
})
@Index("pk_credentials_id", ["id"], { unique: true })
@Entity("credentials", { schema: "public" })
export class Credentials {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "credential_group_id", nullable: true })
  credentialGroupId: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", { name: "link", nullable: true, length: 255 })
  link: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 255,
  })
  password: string | null;

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

  @ManyToOne(
    () => CredentialGroups,
    (credentialGroups) => credentialGroups.credentials,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "credential_group_id", referencedColumnName: "id" }])
  credentialGroup: CredentialGroups;
}
