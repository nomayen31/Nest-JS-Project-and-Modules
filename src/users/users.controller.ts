import { Controller, Get, Post, Param, Body, ParseIntPipe, Query, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // ✔ GET /users/all → return all users (no pagination)
    @Get('all')
    getAllUsersNoPagination() {
        return this.usersService.getAllUsers();
    }

    // ✔ GET /users → return paginated users (limit + page)
    @Get()
    getPaginatedUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        return this.usersService.getAllUsers(limit, page);
    }

    // ✔ GET /users/:id → get single user
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id);
    }

    // ✔ POST /users → create user
    @Post()
    createUser(@Body() user: CreateUserDto) {
        console.log(user instanceof CreateUserDto);
        return this.usersService.createUser(user);
    }
}
