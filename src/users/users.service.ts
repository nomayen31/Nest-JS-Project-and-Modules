import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: { id: number; name: string; age: number; email: string; isAdmin: boolean }[] =
    [
      { id: 1, name: 'John', age: 30, email: 'john@example.com', isAdmin: true },
      { id: 2, name: 'Jane', age: 25, email: 'jane@example.com', isAdmin: false },
      { id: 3, name: 'Bob', age: 35, email: 'bob@example.com', isAdmin: true },
    ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  createUser(user: { id?: number; name: string; age: number; email: string; isAdmin: boolean }) {
    // auto-generate id if not provided
    const newId = user.id ?? (this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1);
    const newUser = { id: newId, ...user };
    this.users.push(newUser);
    return { message: 'User Created Successfully', user: newUser };
  }
}
