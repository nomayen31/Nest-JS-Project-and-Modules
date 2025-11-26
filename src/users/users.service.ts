import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: { id: number; name: string; gender: string; age: number; email: string; isAdmin: boolean }[] =
        [
            { id: 1, name: 'John', gender: 'male', age: 30, email: 'john@example.com', isAdmin: true },
            { id: 2, name: 'Jane', gender: 'female', age: 25, email: 'jane@example.com', isAdmin: false },
            { id: 3, name: 'Bob', gender: 'male', age: 35, email: 'bob@example.com', isAdmin: true },
        ];

    getAllUsers(limit?: number, page?: number, isAdmin?: boolean) {
        let data = this.users;
        if (typeof isAdmin === 'boolean') data = data.filter(u => u.isAdmin === isAdmin);

        if (!limit || !page) return data;

        const start = (page - 1) * limit;
        return {
            page,
            limit,
            totalUsers: data.length,
            totalPages: Math.ceil(data.length / limit),
            data: data.slice(start, start + limit),
        };
    }


    getUserById(id: number) {
        const user = this.users.find((u) => u.id === id);
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    createUser(user: { id?: number; name: string; gender?: string; age: number; email: string; isAdmin: boolean }) {
        const newId = user.id ?? (this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1);
        const newUser = { id: newId, gender: user.gender ?? 'not specified', ...user };
        this.users.push(newUser);
        return { message: 'User Created Successfully', user: newUser };
    }
   
}
