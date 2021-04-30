export class UpdateCoffeeDto {
    // the readonly keyword helps maintain immutability for the CreateCoffeeDto objects
    //the questions marks here means that the property is optional
    readonly name?: string;
    readonly brand?: string;
    readonly flavors?: string[];
}
