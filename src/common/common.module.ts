import { Module } from '@nestjs/common';
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {ApiKeyGuard} from "./guards/api-key.guard";
import {ConfigModule} from "@nestjs/config";
import {WrapResponseInterceptor} from "./interceptors/wrap-response.interceptor";
import {TimeoutInterceptorInterceptor} from "./interceptors/timeout-interceptor.interceptor";

@Module({
    imports: [ConfigModule],
    providers:[
        /**
         * Because we use dependency injection inside of our GUARD,(we inject ConfigService)
         * GLOBAL GUARDS that DEPEND on other CLASSES must be DECLARED in a MODULE
         *
         */
        // {
        //     provide: APP_GUARD,
        //     useClass: ApiKeyGuard
        // },
        {
            provide: APP_INTERCEPTOR,
            useClass: WrapResponseInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptorInterceptor
        }
    ]
})
export class CommonModule {}
