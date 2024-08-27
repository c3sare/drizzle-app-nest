import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './drizzle.schema';
import { DRIZZLE_SERVICE } from './drizzle.constants';

const useFactory = async (configService: ConfigService) => {
  const connectionString = configService.get<string>('DATABASE_URL');
  const pool = neon(connectionString);
  return drizzle(pool, { schema });
};

export type DrizzleClient = Awaited<ReturnType<typeof useFactory>>;

@Module({
  providers: [
    {
      provide: DRIZZLE_SERVICE,
      inject: [ConfigService],
      useFactory,
    },
  ],
  exports: [DRIZZLE_SERVICE],
})
export class DrizzleModule {}
