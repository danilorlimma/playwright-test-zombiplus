const { test: base, expect } = require('@playwright/test')

const { Leads } = require('../actions/Leads')
const { Toast } = require('../actions/Components')
const { Login } = require('../actions/Login')
const { Movies } = require('../actions/Movies')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context ['login'] = new Login(page),
        context ['leads'] = new Leads(page),
        context ['toast'] = new Toast(page) ,
        context ['movies'] = new Movies(page)
        await use(context)
    }
})
export { test, expect }