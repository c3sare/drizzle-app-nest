import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../constants';
import { DrizzleClient } from 'src/drizzle/drizzle.module';
import { User } from './types/user';
import { users } from 'src/drizzle/drizzle.schema';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private conn: DrizzleClient) {}

  async getUsers() {
    return await this.conn.query.users.findMany();
  }

  async createUser(user: User) {
    return await this.conn.insert(users).values(user);
  }

  async getUserById(id: number) {
    return await this.conn.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
  }
}
