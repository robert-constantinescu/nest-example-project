import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import {CoffeesModule} from "../coffees/coffees.module";

@Module({
  providers: [CoffeeRatingService],
  imports: [CoffeesModule]
})
export class CoffeeRatingModule {}
