import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { PoliciesModule } from './policies/policies.module';
import { AuditModule } from './audit/audit.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [AuthModule, UsersModule, SettingsModule, WebhooksModule, PoliciesModule, AuditModule, MailModule]
})
export class ProjectsModule {}
