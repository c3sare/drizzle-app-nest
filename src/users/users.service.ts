import type { DrizzleClient } from 'src/drizzle/drizzle.module';
import type { User } from './types/user';

import { Inject, Injectable } from '@nestjs/common';

import { users } from 'src/drizzle/drizzle.schema';
import { DRIZZLE_SERVICE } from 'src/drizzle/drizzle.constants';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE_SERVICE) private readonly db: DrizzleClient) {}

  async getUsers() {
    return await this.db.query.users.findMany();
  }

  async createUser(user: User) {
    return await this.db.insert(users).values(user);
  }

  async getUserById(id: number) {
    return await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
  }
}
