import { Module } from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {ApiKeyGuard} from "./guards/api-key.guard";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers:[
        /**
         * Because we use dependency injection inside of our GUARD,(we inject ConfigService)
         * GLOBAL GUARDS that DEPEND on other CLASSES must be DECLARED in a MODULE
         *
         */
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard
        }
    ]
})
export class CommonModule {}
