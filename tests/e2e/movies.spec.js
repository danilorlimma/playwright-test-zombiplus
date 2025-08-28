import { test } from '../support';

const data = require('../support/fixtures/movies.json')
const { executeSql } = require('../support/database')

test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create
    await executeSql(`DELETE from movies where title ='${data.create.title}'`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)


    await page.toast.containText('Cadastro realizado com sucesso!')

})