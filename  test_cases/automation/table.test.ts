import {test, expect} from '@playwright/test';
import {TablePage} from './table.page';

test.describe('Automation Test Verification - Shares', () => {
    let tablePage: TablePage;

    test.beforeEach(async ({page}) => {
        tablePage = new TablePage(page);
        await tablePage.goto();
    });

    test('01 Rebalancing with zero target variance (No action required)', async () => {
        const totalAsset = await tablePage.getTotalAssetValue();
        const securities = ['MSFT', 'AAPL', 'HD'];

        for (const security of securities) {
            expect(await tablePage.getTextValue(security, 'output')).toBe('');

            const target = await tablePage.getInputValue(security, 'target-input');
            const current = await tablePage.getInputValue(security, 'current-input');
            const price = await tablePage.getInputValue(security, 'price-input');

            await tablePage.calculate(security);

            const variance = current - target;
            const delta = totalAsset * (variance / 100);
            const expectedShares = Math.trunc(delta / price);

            expect(await tablePage.getTextValue(security, 'variance')).toBe(`${variance}%`);
            expect(await tablePage.getTextValue(security, 'output')).toBe(expectedShares.toString());
        }
    });

    test('02 Rebalancing with negative target variance (Buy shares)', async () => {
        await tablePage.verifyVarianceAndOutput('IBM');
    });

    test('03 Rebalancing with positive target variance (Sell shares)', async () => {
        await tablePage.verifyVarianceAndOutput('ORCL');
    });
});