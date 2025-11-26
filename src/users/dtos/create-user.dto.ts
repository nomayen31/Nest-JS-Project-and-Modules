import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNumber({}, { message: 'Id must be a number' })
    @IsOptional()
    id?: number;

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    name: string;

    @IsString({ message: 'Gender must be a string' })
    @IsOptional()
    gender?: string;

    @IsNumber({}, { message: 'Age must be a number' })
    age: number;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsBoolean({ message: 'Admin status must be a boolean' })
    isAdmin: boolean;
}