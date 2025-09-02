import { test } from '../support';

const data = require('../support/fixtures/movies.json')
const { executeSql } = require('../support/database')

test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create
    await executeSql(`DELETE from movies where title ='${data.create.title}'`)

    await page.login.do('admin@zombieplus.com', 'pwd123')
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({page}) => {
    await page.login.do('admin@zombieplus.com', 'pwd123')

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'])
});