import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Coffee} from "./entities/coffee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Connection, Repository} from "typeorm";
import {async} from "rxjs";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {Flavor} from "./entities/flavor.entity";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import {Event} from "../events/entities/event.entity";

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor) private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection) {
    }

    findAll(paginationQuery: PaginationQueryDto) {
        /**
         *       We labelled the 'flavors' column as our RELATION for Coffee, and now we use it here to eager load the 'flavors'
         *  for the coffee entity that we retrieve
         *
         *  Basically the RELATION we want to eager load when we retrieve the entity, is the 'flavors' one. Named like this in the Coffee entity
         */
        return this.coffeeRepository.find(
            {
                relations: ['flavors'],
                skip: paginationQuery.offset,
                take: paginationQuery.limit
            }
        );
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne(id,
            {relations: ['flavors']}
        );
        if (!coffee) {
            throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        /**
         * 1. we are creating an instance of the Coffee entity from the 'createCoffeeDto'
         * 2. We save the new created coffee entity
         * 3. using `await` in combination with Promise.all() awaits until the entire array of Promises finishes, before executing further code
         */
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        );

        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            // this overrides the flavors property, in this case they both have the same name
            flavors
        });
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        /**
         * 1. 'preload()' method creates a new entity, based on the object pased into it
         *          - preload() first looks to see if an entity already exists in the DB and if it exists it will retrieve
         *          the object and everything related to it
         * 2. If an entity exists already preload() replace all the values with the new ones pased in our updateCoffeeDto
         * 3. preload() will return UNDEFINED if the ID OF the ENTITY was NOT FOUND in DB
         * 4. in the flavors, first we check if the flavors property is defined(since for update is optional): updateCoffeeDto.flavors
         *        otherwise we would get an error because the `flavors`property would be undefined
         */
        const flavors =
            updateCoffeeDto.flavors &&
            (await Promise.all(
                updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
            ));

        const existingCoffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
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

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }

    async recommendCoffee(coffee: Coffee) {
        /**
         * Transactions are used to make multiple modifications to our database, ensuring that either all of them are saved,
         * either none
         */
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recommendations++;
            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = {coffeeId: coffee.id};

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

    }




}
