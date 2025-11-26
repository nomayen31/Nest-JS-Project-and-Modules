import { Controller, Get, Post, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // GET /users
    @Get()
    getAllUsers(@Query() query: { email?: string }) {
        console.log("Query: ", query);
        return this.usersService.getAllUsers(query);
    }

    // GET /users/:id
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: any) {
        return this.usersService.getUserById(id);
    }

    // POST /users
    @Post()
    createUser(
        @Body()
        user: { id?: number; name: string; age: number; email: string; isAdmin: boolean },
    ) {
        return this.usersService.createUser(user);
    }
}
