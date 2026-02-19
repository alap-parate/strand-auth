import { Entity, Column, Index, Check, ManyToOne, JoinColumn } from "typeorm";
import { OAuthProviders } from "@common/enums/oauthproviders.enum";
import { TenantOAuthIdentities } from "./tenant_oauth_identities.entity";
import { TenantAdminLocalCredentials } from "./tenant_admin_local_credentials.entity";

@Index(
    'idx_admin_tokens_hash_active',
    ['tenant_admin_refresh_token'],
    {
        where: `deleted_at IS NULL`
    }
)
@Index(['adminId'])
@Index(['oauth_identity_id'])
@Index(['adminId, authProvider'])
@Check(
  'chk_single_identity',
  `
  (
    (oauth_identity_id IS NOT NULL AND local_credential_id IS NULL)
    OR
    (oauth_identity_id IS NULL AND local_credential_id IS NOT NULL)
  )
  `
)
@Entity({
    name: 'tenant_admin_refresh_token'
})
export class TenantAdminRefreshToken {
    @Column({
        name: 'admin_id',
        type: 'uuid'
    })
    adminId!: string;

    @Column({
        name: 'oauth_identity_id',
        nullable: true
    })
    oAuthIdentityId!: string;

    @Column({
        name: 'local_credential_id',
        nullable: true
    })
    localCredentialId!: string;

    @Column({
        name: 'auth_provider',
        type: 'enum',
        enum: OAuthProviders
    })
    authProvider!: OAuthProviders;

    @Column({
        name: 'token_hash',
    })
    tokenHash!: string;

    @Column({
        name: 'expires_at',
        type: 'timestamp'
    })
    expiresAt!: Date;

    @Column({
        name: 'revoked',
        type: 'boolean',
        default: false
    })
    revoked!: boolean;

    @Column({
        name: 'revoked_at',
        type: 'timestamp',
        nullable: true
    })
    revokedAt!: Date;

    @ManyToOne(() => TenantOAuthIdentities, (oauthidentities) => oauthidentities.tokens)
    @JoinColumn({ name: 'oauth_identity_id' })
    oAuthIdentity!: TenantOAuthIdentities;

    @ManyToOne(() => TenantAdminLocalCredentials, (localidentities) => localidentities.tokens)
    @JoinColumn({ name: 'local_credential_id' })
    localIdentity!: TenantAdminLocalCredentials;

}