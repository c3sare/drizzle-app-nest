import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [DrizzleModule],
  providers: [UsersService],
})
export class UsersModule {}
