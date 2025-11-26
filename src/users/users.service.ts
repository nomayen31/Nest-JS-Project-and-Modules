import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: { id: number; name: string; gender : string; age: number; email: string; isAdmin: boolean }[] =
        [
            { id: 1, name: 'John', gender: 'male', age: 30, email: 'john@example.com', isAdmin: true },
            { id: 2, name: 'Jane', gender: 'female', age: 25, email: 'jane@example.com', isAdmin: false },
            { id: 3, name: 'Bob', gender: 'male', age: 35, email: 'bob@example.com', isAdmin: true },
        ];

    getAllUsers(limit?: number, page?: number) {
        // If no pagination → return all users
        if (!limit || !page) {
            return this.users;
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedData = this.users.slice(startIndex, endIndex);

        return {
            page,
            limit,
            totalUsers: this.users.length,
            totalPages: Math.ceil(this.users.length / limit),
            data: paginatedData,
        };
    }

    
    getUserById(id: number) {
        const user = this.users.find((u) => u.id === id);
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    createUser(user: { id?: number; name: string; gender: string; age: number; email: string; isAdmin: boolean }) {
        // auto-generate id if not provided
        const newId = user.id ?? (this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1);
        const newUser = { id: newId, ...user };
        this.users.push(newUser);
        return { message: 'User Created Successfully', user: newUser };
    }
}
