import {SetMetadata} from "@nestjs/common";

/**
 * We export it, instead of using the string everywhere to avoid mistakes.
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * SetMetadata:
 *      1. The first argument is the key that will be set as Metadata and that will be searched( e.g: 'isPublic')
 *      2. The second argument is what value will the key have
 *
 * 'Public' here, will be the name of the decorator
 *
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);