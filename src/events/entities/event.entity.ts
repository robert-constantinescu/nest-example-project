import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

/**
 * @Index(['type', 'name']):
 *          This is called composite Index() to annotate the whole entity and not each column
 */
@Index(['type', 'name'])
@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    /**
     * If one of the operation our application will do often is retrieving Events based on the name,
     * we can add the @Index() annotation to ensure rapidity in find and retrieving the object from database.
     *
     * We can use @Index() whenever the speed of retrieving and Object is vital important
     */
    @Index()
    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>

}
