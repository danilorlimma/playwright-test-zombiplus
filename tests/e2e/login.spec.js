// @ts-check
import { test } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage')
const {Toast} = require('../pages/Components')
const {MoviesPage} = require('../pages/MoviesPage')

let loginPage
let toast
let moviesPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})

test('Deve logar como administrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
    
})
test('Não deve logar com senha incorreta', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'abc123')
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.containText(message)
})
test('Não deve quando email é inválido', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('www.danilolima.com', 'pwd123')
    await loginPage.alertHaveText('Email incorreto')
})

test('Não deve logar quando email não preenchido', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('', 'abc123')
    await loginPage.alertHaveText('Campo obrigatório')
})
test('Não deve logar quando a senha não é preenchida', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', '')
    await loginPage.alertHaveText('Campo obrigatório')
})
test('Não deve quando nenhum campo é preenchido', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('', '')
    await loginPage.alertHaveText(['Campo obrigatório','Campo obrigatório'])
})



