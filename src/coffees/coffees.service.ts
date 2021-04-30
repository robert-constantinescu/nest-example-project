import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {async} from "rxjs";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>) {
    }

    findAll() {
        return this.coffeeRepository.find();
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne(id);
        if (!coffee) {
            throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        /**
         * 1. we are creating an instance of the Coffee entity from the 'createCoffeeDto'
         * 2. We save the new created coffee entity
         */
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        /**
         * 1. 'preload()' method creates a new entity, based on the object pased into it
         *          - preload() first looks to see if an entity already exists in the DB and if it exists it will retrieve
         *          the object and everything related to it
         * 2. If an entity exists already preload() replace all the values with the new ones pased in our updateCoffeeDto
         * 3. preload() will return UNDEFINED if the ID OF the ENTITY was NOT FOUND in DB
         *
         */
        const existingCoffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        });
        if (!existingCoffee) {
            throw new HttpException(`Coffee with #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return this.coffeeRepository.save(existingCoffee);
    }

    async remove(id: string) {
        const coffee = await this.coffeeRepository.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }




}
