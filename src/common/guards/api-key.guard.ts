import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Request} from "express";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ApiKeyGuard implements CanActivate {


    constructor(
        /**
         * The REFLECTOR class, allows us to RETRIEVE METADATA within a SPECIFIC CONTEXT
         *
         */
        private readonly reflector: Reflector,
        private readonly confService: ConfigService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        /**
         *  1. this.reflector.get() will look up for the METADATA by it's key.( e.g: 'isPublic')
         *  2. For the 2nd Parameter we use the REFLECTOR to retrieve METADATA of a HANDLER(method) in a given context.
         *
         * We can also add METADATA to classes, and then use .getClass() to retrieve METADATA from CLASS level.
         * For more info about other METADATA you can read THE DOCUMENTATION
         *
         */
        const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
        if ( isPublic ) {
            return true;
        }
        const request =  context.switchToHttp().getRequest<Request>()
        const authHeader = request.header('Authorization');
        return authHeader === this.confService.get('API_KEY');
    }


}