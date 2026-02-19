import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users/users.module';
import { TenantsModule } from '@modules/tenants/tenants.module';
import { OidcModule } from '@modules/oidc/oidc.module';
import { DatabaseModule } from '@infra/db/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { QueueModule } from '@infra/queue/queue.module';
import { CacheModule } from '@infra/cache/cache.module';
import { ConfigModule } from '@infra/config/config.module';
import { LoggerModule } from './infra/logger/logger.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    TenantsModule,
    OidcModule,
    DatabaseModule,
    AuthModule,
    QueueModule,
    CacheModule,
    LoggerModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
