import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";
import {WrapResponseInterceptor} from "./interceptors/wrap-response.interceptor";
import {TimeoutInterceptorInterceptor} from "./interceptors/timeout-interceptor.interceptor";
import {LoggingMiddleware} from "./middleware/logging.middleware";

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
export class CommonModule implements NestModule {

    configure(consumer: MiddlewareConsumer): any {
        /**
         *      - The NestModule interface requires to implement the configure() method, which takes the MiddlewareConsumer
         *  as an argument
         *      - The MiddlewareConsumer provides a set of useful methods to TIE Middleware to SPECIFIC ROUTES
         *
         *   - apply the logging middleware to all routes using the wildcard argument:
         *         - consumer.apply(LoggingMiddleware).forRoutes('*');
         *
         *   - apply to all routes GET methods:
         *         - consumer.apply(LoggingMiddleware).forRoutes({path: '*', method: RequestMethod.GET});
         *
         *   - apply to all routes EXCLUDING the ones with 'coffees' prefix:
         *         - consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*');
         */
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
