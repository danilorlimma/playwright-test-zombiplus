
const { test: base, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')
const { LandingPage } = require('../pages/LandingPage')

const test = base.extend({

    page: async ({ page }, use) => {
        await use({
            ...page,
            login: new LoginPage(page),
            toast: new Toast(page),
            movies: new MoviesPage(page),
            landing: new LandingPage(page)
        })
    }
})
export { test, expect }   