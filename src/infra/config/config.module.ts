import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configs from './configurations';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: configs,
      cache: true,
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
