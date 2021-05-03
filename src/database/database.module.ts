import {DynamicModule, Module} from '@nestjs/common';
import {ConnectionOptions, createConnection} from "typeorm";

/**
 * This DatabaseModule can be imported in other modules like this:
 *  @Module({
 *      imports: [
 *          DatabaseModule.regiser({
 *              type: 'postgres',
                host: 'localhost',
                port: 5432
 *           })
 *       ]
 *  })
 */

@Module({
    /**
     *  this is used for comparison with what is in the register() method.
     *  Need to investigate if they are also used as default values, if i don't call the register() method
     */
    //
    providers: [{
        provide: 'CONNECTION',
        useValue: createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432
        })
    }]
})
export class DatabaseModule {

    static register(options: ConnectionOptions): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: createConnection(options)
                }
            ]
        };
    }

}
