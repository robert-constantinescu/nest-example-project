import {Type} from "class-transformer";
import {IsOptional, IsPositive} from "class-validator";

export class PaginationQueryDto {

    /**
     * QueryParams are sent through the network as strings. The below @Type helps convert them to numbers before using them
     */
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    offset: number;
}
