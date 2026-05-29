import { type Page, type Locator, expect } from '@playwright/test';
import * as path from 'path';
declare const __dirname: string;

export class TablePage {
    readonly totalAssetInput: Locator;

    constructor(private readonly page: Page) {
        this.totalAssetInput = page.locator('#total-asset');
    }

    async goto() {
        const absolutePath = path.resolve(__dirname, '../../index.html');
        await this.page.goto(new URL(`file://${absolutePath}`).toString());
    }

    private getLocator(security: string, suffix: string): Locator {
        const testId = `${security.toLowerCase()}-${suffix}`;
        return this.page.getByTestId(testId);
    }

    async calculate(security: string) {
        await this.getLocator(security, 'calc-button').click();
    }

    async getTotalAssetValue(): Promise<number> {
        return parseFloat(await this.totalAssetInput.inputValue());
    }

    async getInputValue(security: string, type: 'target-input' | 'current-input' | 'price-input'): Promise<number> {
        const value = await this.getLocator(security, type).inputValue();
        return parseFloat(value);
    }

    async getTextValue(security: string, type: 'variance' | 'output'): Promise<string> {
        const value = await this.getLocator(security, type).innerText();
        return value.trim();
    }

    async verifyVarianceAndOutput(security: string) {
        const totalAsset = await this.getTotalAssetValue();
        const target = await this.getInputValue(security, 'target-input');
        const current = await this.getInputValue(security, 'current-input');
        const price = await this.getInputValue(security, 'price-input');

        await expect(this.totalAssetInput).toHaveValue(totalAsset.toString());
        await this.calculate(security);

        const variance = current - target;
        const delta = totalAsset * (variance / 100);
        const expectedShares = Math.trunc(delta / price);
        const expectedOutputStr = expectedShares > 0 ? `+${expectedShares}` : expectedShares.toString();

        expect(await this.getTextValue(security, 'variance')).toBe(`${variance}%`);
        expect(await this.getTextValue(security, 'output')).toBe(expectedOutputStr);
    }
}