// @ts-check
import { test } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')
const data = require('../support/fixtures/movies.json')
const { executeSql } = require('../support/database')

let loginPage
let toast
let moviesPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})
test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create
    await executeSql(`DELETE from movies where title ='${data.create.title}'`)

    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)


    await toast.containText('Cadastro realizado com sucesso!')

})