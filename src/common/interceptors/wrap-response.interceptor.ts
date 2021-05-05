import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map, tap} from "rxjs/operators";


/**
 * - Interceptors have many capabilities inspired by the AspectOrientedProgramming technique.
 * - The AOP aims to increase modularity by allowing the separation of cross cutting concerns.
 * - Interceptors achieve this by ADDING ADDITIONAL BEHAVIOUR to EXISTING CODE. WITHOUT MODIFYING the CODE:
 * - Interceptors make possible to:
 *    - bind EXTRA LOGIC. Before or After a method execution
 *    - TRANSFORM the RESULT returned from a METHOD
 *    - TRANSFORM the EXCEPTION thrown from a METHOD
 *    - EXTEND BASIC method BEHAVIOUR
 *    - even COMPLETELY OVERRIDING a method, according to specific conditions(e.g: caching various responses)
 *
 */
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before....')
    const response = context.switchToHttp().getResponse();

    return next.handle()
        .pipe(
            map(data => (
                {
                  statusCode: 200,
                  data
                })
            )
        );
  }
}
