import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users/users.module';
import { TenantsModule } from '@modules/tenants/tenants.module';
import { DatabaseModule } from '@infra/db/database.module';
import { QueueModule } from '@infra/queue/queue.module';
import { CacheModule } from '@infra/cache/cache.module';
import { ConfigModule } from 'src/config/config.module';
import { LoggerModule } from './infra/logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    TenantsModule,
    DatabaseModule,
    QueueModule,
    CacheModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
