import {Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {REQUEST} from "@nestjs/core";
import {Request} from "express";

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeeService: CoffeesService,
        //the request object will have us access to data from the incoming request
        @Inject(REQUEST) private readonly request: Request) {
        console.log(`CoffeeController was instantiated`)
    }

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        // example url: /coffees?limit=20&offset=10
        const {limit, offset} = paginationQuery;
        return this.coffeeService.findAll(paginationQuery);
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
