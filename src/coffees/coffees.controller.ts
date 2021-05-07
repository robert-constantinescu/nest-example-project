import {Body, Controller, Delete, Get, Param, Patch, Post, Query, SetMetadata} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {Public} from "../common/decorators/public.decorator";
import {ParseIntPipe} from "../common/pipes/parse-int.pipe";
import {Protocol} from "../common/decorators/protocol.decorator";

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeeService: CoffeesService
    ) {
        console.log(`CoffeeController was instantiated`)
    }

    @Public()
    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto, @Protocol('https') protocol: string) {
        // example url: /coffees?limit=20&offset=10
        console.log(protocol);
        const {limit, offset} = paginationQuery;
        return this.coffeeService.findAll(paginationQuery);
    }

    @Get('flavours')
    findAllFlavours() {
        return 'This action returns all the flavours';
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id)  {
        console.log(id);
        return this.coffeeService.findOne(id);
    }

    @Get(':id')
    findOneAllParams(@Param(ParseIntPipe) params) {
        return this.coffeeService.findOne(params.id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeeService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeeService.remove(id);
    }

}
