import {IsString} from "class-validator";

export class CreateCoffeeDto {
    /**
     *   -  the readonly keyword helps maintain immutability for the CreateCoffeeDto objects
     *   - the @IsString() decorator validates the object when it's received in the controller and throws a 400-bad request
     *   if the porperty is not of type string.
     *   - to use the @IsString() and other validation decorator you need to install: npm i class-validator class-transformer
     *
     */

    @IsString()
    readonly name: string;

    @IsString()
    readonly brand: string;

    /**
     * {each: true} -> inidcates that the expected value is an array of strings(each object from array is a string)
     */
    @IsString({each: true})
    readonly flavors: string[];
}
