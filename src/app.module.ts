import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CoffeesModule} from './coffees/coffees.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import {ConfigModule} from "@nestjs/config";
import appConfig from './config/app.config'
import {APP_PIPE} from "@nestjs/core";
import { CommonModule } from './common/common.module';

@Module({
  imports: [
      //asyncronously loading the module so that the properties will be assigned after they are available.
      // order of the imported modules matter. Using the async strategy, the order of the imported module will not matter anymore
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        //syncronize should NEVER be used IN  PRODUCTION MODE
        synchronize: true,
      })
    }),
    ConfigModule.forRoot(
        /**
         * npm i @nestjs/config   -needs to be installed to use the ConfigModule
         *
         * Here you can pass an object with options and configure for example:
         *  -envFilePath:
         *    - the path to the .env file:
         *
         * -ignoreEnvFile: true
         *    - option to totally ignore what's in the .env file if some other app will provide the configuration file:
         *
         * - validationSchema:
         *    - let the app know what are the mandatory configuration variable that need to be provided for the
         *    application to start properly.
         *    - This is done with the help of 2 other dependencies: npm i @hapi/joi  &  npm i --save-dev @types/hapi__joi
         *    - import * as Joi from "@hapi/joi";
         *    - Below we are requiring the DATABASE_HOST & DATABASE_PORT to be provided in the configuration file(e.g: .env)
         *
         * - load:
         *    -can load a configuration typescript file where we can have a configuration logic
         *
         *    And other options that you can find at a google search
         *
         *    example of options Object:
         *    import appConfig from './config/app.config'
         *    import * as Joi from './hapi/joi'
         *    {
         *        envFilePath: '.env',
         *        validationSchema: Joi.object({
         *           DATABASE_HOST: Joi.required(),
         *           DATABASE_PORT: Joi.number().default(5432)
         *        }),
         *        load: [appConfig]
         *    }
         */
        {
          load: [appConfig]
        }
    ),
    CoffeesModule,
    CoffeeRatingModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
    {
      /**
       * APP_PIPE is a special token imported from NestJS.
       * Providing a ValidationPipe in this manner, allows Nest instantiating the ValidationPipe within the SCOPE of MODULE
       * and once created, it register it as a GLOBAL PIPE.
       */
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
