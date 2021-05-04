/**
 * this will be imported like this:
 *   1.  import appConfig from './config/app.config'
 *   2.  ConfigModule.forRoot({
 *         load: [appConfig]
 *       })
 */

export default () => ({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
})