import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  /**
   *     - Middleware functions have access to the request and response objects, and they are not specifically tied ot ANY METHOD,
   *   but rather to a SPECIFIC ROUTE PATH.
   *
   * Middleware can perform the following tasks:
   *    - execute code
   *    - make changes to the request and response objects
   *    - ENDING the Request-Response cycle
   *    - or even calling the next Middleware function in the CallStack
   *
   *     - If the current Middleware function DOES NOT END the REQ-RES Cycle it MUST CALL the NEXT method,
   *   WHICH PASSES the CONTROL to the NEXT Middleware function. OTHERWISE the REQUEST WILL be LEFT HANGING and NEVER COMPLETE
   *
   *
   * Custom Middleware can be done in a FUNCTION or a CLASS:
   *    - Function Middleware:
   *          - is STATELESS
   *          - it CAN NOT INJECT DEPENDENCIES
   *          - does NOT HAVE ACCESS to the NEST Container
   *
   *    - CLASS Middleware:
   *          - CAN RELY on EXTERNAL DEPENDENCIES
   *          - and INJECT PROVIDERS registered IN THE SAME MODULE SCOPE
   *          - they IMPLEMENT the 'NestMiddleware' interface from @nestjs/common
   *
   * @param req
   * @param res
   * @param next
   */

  use(req: any, res: any, next: () => void) {
    console.time('Request-Response Time');
    console.log('Hi from the LoggingMiddleware');

    res.on('finish', () => console.timeEnd('Request-Response Time'))
    console.timeLog('Request-Response Time');

    /**
     * ALWAYS CALL THE next() function. OTHERWISE the REQUEST will be LEFT HANGING
     *
     */
    next();
  }
}
