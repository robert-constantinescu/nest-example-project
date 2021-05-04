import { registerAs} from "@nestjs/config";

/**
 * Using this type of configuration help us to later inject the configuration file and be able to call it like below:
 * This file also needs to be imported in the required module using the: ConfigModule.forFeature(coffeesConfig)
 *
 * import coffeeConfig from './config/coffees.config';
 *
 * constructor( @Inject(coffeeConfig.KEY) private readonly coffeesConfiguration: ConfigType<typeof coffeeConfig> ) {
 *       console.log(coffeesConfiguration.foo);
 *   }
 *
 * Basically allowing us to call the properties of the configuration file NOT as strings, to avoid typo and other similar mistakes
 */

export default registerAs(
    'coffees', () => ({
        foo: 'bar'
    })
);