import { expect } from '@playwright/test';
export class Toast {
    constructor(page) {
        this.page = page
    }

    async containText(message) {
        await expect(this.page.locator('.toast')).toContainText(message)
        await expect(this.page.locator('.toast')).toBeHidden({ timeout: 5000 })
    }
}