import {PartialType} from "@nestjs/mapped-types";
import {CreateCoffeeDto} from "./create-coffee.dto";


/**
 * - PartialType(CreateCoffeeDto)  => adds all the fields from the provided class(CreateCoffeeDto) as optional
 * and it also inherits the validation rules defined in the CreateCoffeeDto
 */
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto){}
