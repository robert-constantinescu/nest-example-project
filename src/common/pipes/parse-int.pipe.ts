import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  /**
   * @param value the value of the currently processed argument before it will be received by our route handling method
   * @param metadata the metadata of the currently processed argument
   *
   * metadata =  data about the data
   *
   * Pipes can be used for example:
   *    -  to provide default values, if the client is not sending all of the data
   *    -
   *
   */
  transform(value: string, metadata: ArgumentMetadata) {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      throw new BadRequestException(
          `Validation failed. "${newValue}" is not an integer.`
      )
    }
    return newValue;
  }
}
