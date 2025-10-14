import { Column, Entity, Index, OneToMany } from "typeorm";
import { AccountHasCredentialGroups } from "./AccountHasCredentialGroups";

@Index("pk_account_id", ["id"], { unique: true })
@Entity("accounts", { schema: "public" })
export class Accounts {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", {
    name: "first_name",
    nullable: true,
    length: 255,
  })
  firstName: string | null;

  @Column("character varying", {
    name: "last_name",
    nullable: true,
    length: 255,
  })
  lastName: string | null;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column("character varying", {
    name: "access_token",
    nullable: true,
    length: 255,
  })
  accessToken: string | null;

  @Column("character varying", {
    name: "refresh_token",
    nullable: true,
    length: 255,
  })
  refreshToken: string | null;

  @Column("timestamp without time zone", {
    name: "verified_at",
    nullable: true,
  })
  verifiedAt: Date | null;

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
    (accountHasCredentialGroups) => accountHasCredentialGroups.account
  )
  accountHasCredentialGroups: AccountHasCredentialGroups[];
}
