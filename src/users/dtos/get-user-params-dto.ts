import { IsBoolean, IsOptional } from "class-validator";

export class GetUserParamsDto {
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean;
}   
