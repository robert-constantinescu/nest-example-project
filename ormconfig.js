/**
 * Create new migration cmd: 'npx typeorm migration:create -n CoffeeRefactor'
 *
 * npx: let us use executable packages, without the need to install them
 *
 * Run the migrations:  'npx typeorm migration:run'
 *
 * REVERT the migrations:  'npx typeorm migration:revert'
 *
 *
 * TypeORM knows how to create automagically migration files by looking on the entity definition you provide
 * and comparing it to what's in the database:
 *   1. Make the necessary modification on the Entity
 *   2. Run:   'npm run build'    this is necessary because the modified Entity file needs to be in 'dist' folder for typeORM to read it
 *   3. Use typeORM to create new migration:  <npx typeorm migration:generate -n NameOfTheMigration>
 */

module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    /**
     * TypeORM migrations need to work on compiled files, which NEST will output in the 'dist' folder
     */
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations'
    }
}