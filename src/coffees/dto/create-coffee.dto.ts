export class CreateCoffeeDto {
    // the readonly keyword helps maintain immutability for the CreateCoffeeDto objects
    readonly name: string;
    readonly brand: string;
    readonly flavors: string[];
}
