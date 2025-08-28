// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

//JS Classes e módulos = PascalCase
//Const, Variaveis e Funcoes = camelCase
// $ termina com, * contem, ^ inicia com = REGEX
let landingPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  //visit
  await landingPage.visit()
  //openLeadModal
  await landingPage.openLeadModal()
  //submitLeadForm
  await landingPage.submitLeadForm(leadName, leadEmail)
  // toastHaveText 
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.containText(message)

  await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!');
});
test('Não deve cadastrar quando email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  expect(newLead.ok()).toBeTruthy()


  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.containText(message)

  await expect(page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!');
});
test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('UserEmailIncorreto', 'teste.com')

  await landingPage.alertHaveText('Email incorreto')
});
test('Não deve quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'teste@g.com')

  await landingPage.alertHaveText('Campo obrigatório')
});
test('Não deve quando o email não é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Juliano usuarioo', '')
  await landingPage.alertHaveText('Campo obrigatório')

});
test('Não deve quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')
  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});