const { Pool } = require('pg')

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432
}
export async function executeSql(sqlScript) {

    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()
        const result = await client.query(sqlScript)
        console.log(sqlScript)
        console.log(result.rows)

    } catch (error) {
        console.log('Erro ao executar o SQL: '+ error)
    }

}