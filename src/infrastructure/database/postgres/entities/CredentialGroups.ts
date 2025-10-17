import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { AccountHasCredentialGroups } from './AccountHasCredentialGroups';
import { Credentials } from './Credentials';

@Index('pk_credential_group_id', ['id'], { unique: true })
@Entity('credential_groups', { schema: 'public' })
export class CredentialGroups {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  createdAt: Date | null;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp without time zone',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => AccountHasCredentialGroups, (ahcg) => ahcg.credentialGroup)
  accountHasCredentialGroups: AccountHasCredentialGroups[];

  @OneToMany(
    () => require('./Credentials').Credentials,
    (credential: any) => credential.credentialGroup,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  credentials: Credentials[];
}
