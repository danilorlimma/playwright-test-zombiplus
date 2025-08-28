import { test, expect } from '../support';
import { faker } from '@faker-js/faker';

//JS Classes e módulos = PascalCase
//Const, Variaveis e Funcoes = camelCase
// $ termina com, * contem, ^ inicia com = REGEX
// let page.landing
// let page.toast

test('Deve cadastrar um lead na fila de espera', async ({ page}) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  //visit
  await page.landing.visit()
  //openLeadModal
  await page.landing.openLeadModal()
  //submitLeadForm
  await page.landing.submitLeadForm(leadName, leadEmail)
  // page.toastHaveText 
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)
  
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


  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)

  
});
test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('UserEmailIncorreto', 'teste.com')

  await page.landing.alertHaveText('Email incorreto')
});
test('Não deve quando o nome não é preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'teste@g.com')

  await page.landing.alertHaveText('Campo obrigatório')
});
test('Não deve quando o email não é preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Juliano usuarioo', '')
  await page.landing.alertHaveText('Campo obrigatório')

});
test('Não deve quando nenhum campo é preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')
  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});