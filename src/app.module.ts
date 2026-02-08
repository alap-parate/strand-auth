import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users/users.module';
import { TenantsModule } from '@modules/tenants/tenants.module';
import { OidcModule } from '@modules/oidc/oidc.module';
import { DbModule } from '@infra/db/db.module';
import { AuthModule } from '@modules/auth/auth.module';
import { QueueModule } from '@infra/queue/queue.module';
import { CacheModule } from '@infra/cache/cache.module';
import { ConfigModule } from '@infra/config/config.module';

@Module({
  imports: [
    ConfigModule, 
    UsersModule, 
    TenantsModule, 
    OidcModule, 
    DbModule, 
    AuthModule, 
    QueueModule, 
    CacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
