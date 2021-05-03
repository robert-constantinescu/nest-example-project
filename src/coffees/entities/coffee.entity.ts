import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Flavor} from "./flavor.entity";


@Entity()
export class Coffee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({default: 0})
    recommendations: number;

    /**
     * @JoinTable() specifies the OWNER side of the relationship.(in this case the Coffee)
     *
     * @ManyToMany :
     *    The first parameter
     *      - establish what the TYPE for this relationship is.
     *      - This is just a function that returns a reference to the related entity. In this case the Flavor entity
     *
     *    The second parameter
     *      - we pass in an arrow function that return the entity and specify WHAT PROPERTY NEEDS TO BE SELECTED.
     *      - This is the inverse side of the relationship
     *      - In other words: " What is coffee inside of the Flavor entity"
     *
     */
    @JoinTable()
    @ManyToMany(
        type => Flavor,
        (flavor) => flavor.coffees,
        {
            cascade: true,
        }

    )
    flavors: Flavor[];

}