import {Injectable, Module} from '@nestjs/common';
import {CoffeesController} from "./coffees.controller";
import {CoffeesService} from "./coffees.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Coffee} from "./entities/coffee.entity";
import {Flavor} from "./entities/flavor.entity";
import {Event} from "../events/entities/event.entity";
import {Connection} from "typeorm";
import {ConfigModule} from "@nestjs/config";
import coffeesConfig from './config/coffees.config'


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
     * ----------------------------------------------------------------------------------------------------------------
     * Class Providers
     * {
     *       provide: ConfigService,
     *       useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService: ProductionConfigService
     *   },
     * -----------------------------------------------------------------------------------------------------------------
     * Factory Providers
     *  - How the Factory provider is looking:
     *       @Injectable()
     *       export class CoffeeBrandsFactory {
     *           create() {
     *               // do something
     *           return ['buddy brew', 'lavazza'];
     *          }
     *       }
     *
     * - How the Factory provider is declared in the module:
     *
     *    {
     *       provide: 'COFFEE_BRANDS',
     *       // basically we call a method from the CoffeeBrandsFactory, that returns an array of brands that we can
     *       // use by injecting this provider using the 'COFFEE_BRANDS' token
     *       useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create()
     *       inject: [CoffeeBrandsFactory] // this is passed in the useFactory function, to use them how we need
     *   }
     * ----------------------------------------------------------------------------------------------------------------
     * Asynchronous Providers
     *  - basically here we firs wait for the coffee brands to be retrieved from the database and then we can use them
     *  in any class based on the COFFEE_BRANDS token
     *       {
     *         provide: 'COFFEE_BRANDS',
     *           useFactory: async (connection: Connection): Promise<string[]> => {
     *               //const coffeeBrands =  await connection.query('SELECT ...');
     *               const coffeeBrands = await Promise.resolve(['lavazza', 'bio cafe']);
     *              return coffeeBrands;
     *          },
     *          inject: [Connection]
     *       }
     *
     *
     */
    providers: [
        CoffeesService,
        {
            provide: 'COFFEE_BRANDS',
            useFactory: async (connection: Connection): Promise<string[]> => {
                //const coffeeBrands =  await connection.query('SELECT ...');
                const coffeeBrands = await Promise.resolve(['lavazza', 'bio cafe']);
                return coffeeBrands;
            },
            inject: [Connection]
        }
    ],
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor, Event]),
        ConfigModule.forFeature(coffeesConfig)],
    exports: [CoffeesService]
})
export class CoffeesModule {



}
