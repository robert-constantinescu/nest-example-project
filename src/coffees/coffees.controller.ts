import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeeService: CoffeesService) {
    }

    @Get()
    findAll(@Query() paginationQuery) {
        // example url: /coffees?limit=20&offset=10
        const {limit, offset} = paginationQuery;
        return this.coffeeService.findAll();
    }

    @Get('flavours')
    findAllFlavours() {
        return 'This action returns all the flavours';
    }

    @Get(':id')
    findOneAllParams(@Param() params) {
        return this.coffeeService.findOne(params.id);
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return this.coffeeService.findOne(id);    }

    @Post()
    @HttpCode(HttpStatus.GONE)
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
