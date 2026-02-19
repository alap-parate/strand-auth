import { BaseEntity } from "@infra/db/base.entity";
import { Entity, Column, Index, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { TenantAdmin } from "./tenant_admin.entity";
import { TenantAdminRefreshToken } from "./tenant_admin_refresh_tokens.entity";


@Index(
    'idx_local_credentails_email_active',
    ['email'],
    {
        unique: true,
        where: `deleted_at IS NULL`
    }
)
@Index(
    'idx_local_credentails_admin_active',
    ['adminId'],
    {
        unique: true,
        where: `deleted_at IS NULL`
    }
)
@Entity({
    name: 'tenant_admin_local_credentials'
})
export class TenantAdminLocalCredentials extends BaseEntity {
    
    @Column({
        name: 'admin_id',
        type: 'uuid'
    })
    adminId!: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255
    })
    email!: string;

    @Column({
        name: 'password_hash',
        type: 'text'
    })
    passwordHash!: string;

    @Column({
        name: 'is_email_verified',
        type: 'boolean',
        default: false
    })
    isEmailVerified!: boolean;

    @Column({
        name: 'email_verify_token',
        type: 'text',
        nullable: true
    })
    emailVerifyToken!: string;

    @Column({
        name: 'email_verify_expires',
        type: 'timestamp',
        nullable: true
    })
    emailVerifyExpires!: Date;

    @Column({
        name: 'reset_token_hash',
        type: 'text',
        nullable: true
    })
    resetTokenHash!: string;

    @Column({
        name: 'reset_token_expires',
        type: 'timestamp',
        nullable: true
    })
    resetTokenExpires!: Date;

    @OneToOne(() => TenantAdmin, (tenantadmin) => tenantadmin.localCredential)
    @JoinColumn({ name: 'admin_id' })
    admin!: TenantAdmin;

    @OneToMany(() => TenantAdminRefreshToken, (token) => token.localIdentity)
    tokens!: TenantAdminRefreshToken[];
}