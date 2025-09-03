import { expect } from '@playwright/test';
export class Toast {
    constructor(page) {
        this.page = page
    }

    async containText(message) {
        await expect(this.page.locator('.toast')).toContainText(message)
        await expect(this.page.locator('.toast')).toBeHidden({ timeout: 9000 })
        await expect(this.page).toHaveTitle('Zombie+ | Mais que um streaming, uma experiência arrepiante!');
    }
}