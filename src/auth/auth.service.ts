import { Inject, Injectable } from '@nestjs/common';
import { DrizzleClient } from 'src/drizzle/drizzle.module';
import { User } from 'src/users/types/user';
import * as schema from 'src/drizzle/drizzle.schema';

@Injectable()
export class AuthService {
  constructor(@Inject('DB_CONNECTION') private db: DrizzleClient) {}

  async register(user: User) {
    return await this.db.insert(schema.users).values(user);
  }
}
