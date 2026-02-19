import { OAuthProviders } from "@enums/oauthproviders.enum";
import { BaseEntity } from "@infra/db/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { TenantAdmin } from "./tenant_admin.entity";
import { TenantAdminRefreshToken } from "./tenant_admin_refresh_tokens.entity";

@Index(
    'idx_oauth_identities_provider_active',
    ['provider', 'provider_user_id'],
    {
        unique: true,
        where: `"deleted_at IS NULL"`
    }
)
@Index(
    'idx_oauth_identities_admin_provider_active',
    ['provider', 'admin_id'],
    {
        unique: true,
        where: `"deleted_at IS NULL"`
    }
)
@Entity({
    name: 'tenant_oauth_identities'
})
export class TenantOAuthIdentities extends BaseEntity{

    @Column({
        name: 'admin_id',
        type: 'uuid'
    })
    adminId!: string;

    @Column({
        name: 'provider',
        type: 'enum',
        enum: OAuthProviders
    })
    provider!: OAuthProviders;

    @Column({
        name: 'provider_user_id',
        type: 'varchar',
        length: 255
    })
    providerUserId!: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255
    })
    email!: string;

    @Column({
        name: 'access_token',
        type: 'text',
        nullable: true
    })
    accessToken!: string;

    @Column({
        name: 'refresh_token',
        type: 'text',
        nullable: true
    })
    refreshToken!: string;

    @Column({
        name: 'token_expires_at',
        type: 'timestamp',
        nullable: true
    })
    tokenExpiresAt!: Date;

    @Column({
        name: 'raw_profile',
        type: 'jsonb',
        default: '{}'
    })
    rawProfile!: JSON;

    @ManyToOne(() => TenantAdmin, (tenantadmin) => tenantadmin.oauthIdentites)
    @JoinColumn({ name: 'admin_id' })
    admin!: TenantAdmin;

    @OneToMany(() => TenantAdminRefreshToken, (token) => token.oAuthIdentity)
    tokens!: TenantAdminRefreshToken[];

}