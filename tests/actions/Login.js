import { expect } from "playwright/test"

export class Login {
    constructor(page) {
        this.page = page
    }
    async visit() {
        await this.page.goto('http://localhost:3000/admin/login');
        const loginForm = this.page.locator('.login-form');
        await expect(loginForm).toBeVisible();
    }
    async do (email,password){
    await this.visit()
    await this.submit(email, password)
    await this.isLoggedIn()
    }
    async submit(email, senha) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(senha)
        //await this.page.locator('[type=submit]').click()
        await this.page.getByText('Entrar').click()
        
    }
    async toastHaveText(message) {
        //await page.waitForTimeout(1000)
        await expect(this.page.locator('.toast')).toHaveText(message)
        await expect(this.page.locator('.toast')).toBeHidden({ timeout: 5000 })
    }
    async alertHaveText(text){
        await expect(this.page.locator('span[class$=alert]')).toHaveText(text)
    }
     async isLoggedIn() {
        await expect(this.page.locator('a[href="/logout"]')).toBeVisible()
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

}