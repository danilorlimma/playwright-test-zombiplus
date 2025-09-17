const { Pool } = require('pg')

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    password: 'pwd123',
    database: 'zombieplus',
    port: 5432
}
export async function executeSql(sqlScript) {
    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()
        const result = await client.query(sqlScript)

        console.log('O script sql executado: ' + sqlScript);

    } catch (error) {
        console.log('Error ao executar o sql: '+error)
    }

}