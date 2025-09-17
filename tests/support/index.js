
const { test: base, expect } = require('@playwright/test')
const { LoginPage } = require('./actions/LoginPage')
const { Toast } = require('./actions/Components')
const { MoviesPage } = require('./actions/MoviesPage')
const { LandingPage } = require('./actions/LandingPage')

const test = base.extend({

    page: async ({ page }, use) => {
        const context = page
        
            context['login']=new LoginPage(page),
            context['toast']=new Toast(page),
            context['movies']= new MoviesPage(page),
            context['landing']= new LandingPage(page)
        await use(context)
    }
})
export { test, expect }   