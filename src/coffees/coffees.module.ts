import { Module } from '@nestjs/common';
import {CoffeesController} from "./coffees.controller";
import {CoffeesService} from "./coffees.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Coffee} from "./entities/coffee.entity";
import {Flavor} from "./entities/flavor.entity";
import {Event} from "../events/entities/event.entity";

class MockCoffeeService {}

@Module({
    controllers: [CoffeesController],
    /**
     * This is called ValueBased Provider:
     *    providers: [{provide: CoffeesService, useValue: new MockCoffeeService()}],
     *
     * With this syntax, everytime the CoffeeService token will be used(the argument from provide),
     * the MockCoffeeService will be provided
     *-----------------------------------------------------------------------------------------------------------------
     *
     * Non-class-based Provider Tokens:
     *  - This is how is defined in Module:
     *        providers: [
     *                      CoffeesService,
     *                      {provide: 'COFFEE_BRANDS', useValue: ['buddy brew', 'lavazza']}
     *                  ],
     * - This is how it's injected using the Constructor Injection. Even though below we used the string 'COFFEE_BRANDS',
     * it is a common best practice to declare it in a class constants to avoid mistakes when typing
     *      constructor(
     *         @Inject('COFFEE_BRANDS') coffeeBrands: string[]
     *         )
     *
     *
     */
    providers: [
        CoffeesService,
        {provide: 'COFFEE_BRANDS', useValue: ['buddy brew', 'lavazza']}],
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    exports: [CoffeesService]
})
export class CoffeesModule {



}
