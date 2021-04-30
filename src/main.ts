import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        /**
         * whitelist: true => is used to avoid letting clients passing invalid properties to the controllers POST request
         *                    this feature will make sure that the unwanted properties are automatically stripped out and removed
         *
         * forbidNonWhitelisted: true => gives us the option to STOP a request if any non white listed properties are present
         *                              throwing an errors instead
         *
         * transform: true    => - helps us serialize the JSON payloads that we receive, instantiating the needed object
         *                       - it also performs primitive type conversions for things such and booleans and numbers
         *
         */
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
  );
  await app.listen(3000);
}
bootstrap();
