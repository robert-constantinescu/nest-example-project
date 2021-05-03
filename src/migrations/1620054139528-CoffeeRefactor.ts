import {MigrationInterface, QueryRunner} from "typeorm";


/**
 * After the migrations file is created, run:  <npm run build> so that the migration files will be compiled and added to the 'dist' folder
 *
 */

export class CoffeeRefactor1620054139528 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        // up is describing what needs to be changed and how
        await queryRunner.query(
            'ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // down is describing what will be rollbacked and how in case of something is wrong
        await queryRunner.query(
            'ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"'
        )
    }

}
