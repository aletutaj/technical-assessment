import {test, expect} from '@playwright/test';
import {TablePage} from './table.page';

const testData = [
    {security: 'IBM', variance: '-10%', expectedOutput: '-66'},
    {security: 'MSFT', variance: '0%', expectedOutput: '0'},
    {security: 'ORCL', variance: '10%', expectedOutput: '+45'},
    {security: 'AAPL', variance: '0%', expectedOutput: '0'},
    {security: 'HD', variance: '0%', expectedOutput: '0'},
];

test.describe('Automation Test Verification - Shares', () => {
    let tablePage: TablePage;

    test.beforeEach(async ({page}) => {
        tablePage = new TablePage(page);
        await tablePage.goto();
    });

    for (const data of testData) {
        test(`Rebalancing - ${data.security}: verify Variance % and Output (Shares to Buy/Sell)`, async () => {
            await tablePage.calculate(data.security);

            expect(await tablePage.getTextValue(data.security, 'variance')).toBe(data.variance);
            expect(await tablePage.getTextValue(data.security, 'output')).toBe(data.expectedOutput);
        });
    }

    test('Portfolio Integrity: Balanced Cash Delta and Budget Compliance', async () => {
        let totalCashFlow = 0;
        const securities = ['IBM', 'MSFT', 'ORCL', 'AAPL', 'HD'];
        const totalAssets = await tablePage.getTotalAssetValue();

        for (const security of securities) {
            await tablePage.calculate(security);
            const price = await tablePage.getInputValue(security, 'price-input');
            const shares = parseInt(await tablePage.getTextValue(security, 'output')) || 0;
            totalCashFlow += Math.abs(shares * price);
        }
        expect(totalCashFlow).toBeLessThanOrEqual(totalAssets);
    });
});