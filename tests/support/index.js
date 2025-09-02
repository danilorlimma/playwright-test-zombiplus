const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')
const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')

            // login: new LoginPage(page),
            // landing: new LandingPage(page),
            // toast: new Toast(page),
            // movies: new MoviesPage(page)

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context ['login'] = new LoginPage(page),
        context ['landing'] = new LandingPage(page),
        context ['toast'] = new Toast(page) ,
        context ['movies'] = new MoviesPage(page)
        await use(context)
    }
})
export { test, expect }