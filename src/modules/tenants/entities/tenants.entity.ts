import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "@infra/db/base.entity";
import { Plan } from "src/common/enums/plan.enum";
import { TenantStatus } from "src/common/enums/tenant.status.enum";
import { TenantAdmin } from "./tenant_admin.entity";

@Index(
    'idx_tenants_slug_active',
    ['slug'],
    {
        unique: true,
        where: `"deleted_at IS NULL`
    }
)
@Index(
    'idx_tenants_schema_active',
    ['schemaName'],
    {
        unique: true,
        where: `"deleted_at IS NULL`
    }
)
@Entity({
    name: 'tenants'
})
export class Tenants extends BaseEntity {

    @Column({
        name: 'name',
        type: 'varchar'
    })
    name!: string;

    @Column({
        name: 'slug',
        type: 'varchar',
    })
    slug!: string;

    @Column({
        name: 'schema_name',
        type: 'varchar',
    })
    schemaName!: string;

    @Column({
        type: 'enum',
        enum: Plan,
        default: Plan.FREE
    })
    plan!: Plan

    @Column({
        type: 'enum',
        enum: TenantStatus,
        default: TenantStatus.ACTIVE
    })
    status!: TenantStatus

    @OneToMany(() => TenantAdmin, (tenantAdmin) => tenantAdmin.tenant)
    admins!: TenantAdmin[];
}