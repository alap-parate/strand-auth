import { Column, Entity, JoinColumn, ManyToOne, OneToOne, Index, OneToMany } from "typeorm";
import { TenantRoles } from "src/common/enums/tenantroles.enum";
import { Tenants } from "./tenants.entity";
import { TenantOAuthIdentities } from "./tenant_oauth_identities.entity";
import { TenantAdminLocalCredentials } from "./tenant_admin_local_credentials.entity";
import { BaseEntity } from "@infra/db/base.entity";
import { TenantAdminUser } from "@common/enums/tenantadminuser.enum";

@Index(
    'idx_tenant_admins_email_active',
    ['tenantId', 'email'],
    {
        unique: true,
        where: `"deleted_at" IS NULL`
    }
)
@Entity({
    name: 'tenant_admins'
})
export class TenantAdmin extends BaseEntity{
    @Column({
        name: 'tenant_id',
        type: 'uuid',
    })
    tenantId!: string;

    @Column({
        name: 'email',
        type: 'varchar'
    })
    email!: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        nullable: true
    })
    firstName!: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        nullable: true
    })
    lastName!: string;

    @Column({
        name: 'avatar_url',
        type: 'text',
        nullable: true
    })
    avatarUrl!: string;

    @Column({
        name: 'last_login_at',
        type: 'timestamp'
    })
    lastLoginAt!: Date;

    @Column({
        name: 'tenant_roles',
        type: 'enum',
        default: TenantRoles.ADMIN
    })
    role!: TenantRoles;

    @Column({
        name: 'is_owner',
        type: 'boolean',
        default: false
    })
    isOwner!: boolean;

    @Column({
        name: 'status',
        type: 'enum',
        default: TenantAdminUser.ACTIVE,
        enum: TenantAdminUser
    })
    status!: boolean;

    @ManyToOne(() => Tenants, (tenant) => tenant.admins)
    @JoinColumn({ name: 'tenant_id' })
    tenant!: Tenants;

    @OneToMany(() => TenantOAuthIdentities, (identity) => identity.admin)
    oauthIdentites!: TenantOAuthIdentities[];

    @OneToOne(() => TenantAdminLocalCredentials, (local) => local.admin)
    localCredential!: TenantAdminLocalCredentials
}