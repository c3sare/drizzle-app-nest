import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PG_CONNECTION } from '../../constants';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './drizzle.schema';

const useFactory = async (configService: ConfigService) => {
  const connectionString = configService.get<string>('DATABASE_URL');
  const pool = neon(connectionString);
  return drizzle(pool, { schema });
};

export type DrizzleClient = Awaited<ReturnType<typeof useFactory>>;

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory,
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
