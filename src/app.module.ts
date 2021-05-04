import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CoffeesModule} from './coffees/coffees.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import {ConfigModule} from "@nestjs/config";
import * as Joi from "@hapi/joi";

@Module({
  imports: [
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
         *    - Below we are requiring the DATABASE_HOST & DATABASE_PORT to be provided in the configuration file(e.g: .env)
         *
         *
         *    And other options that you can find at a google search
         */
        {
          envFilePath: '.env',
          validationSchema: Joi.object({
            DATABASE_HOST: Joi.required(),
            DATABASE_PORT: Joi.number().default(5432)
          })
        }
    ),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      //syncronize should NEVER be used IN  PRODUCTION MODE
      synchronize: true,
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
