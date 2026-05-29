## Assumptions

1. Calculations truncated to the nearest whole number.
2. No Extra Costs

## Test Environment 
For testing purposes, a simple UI was built consisting of a data table with the 5 required securities (IBM, MSFT, ORCL, AAPL, HD),a total asset value of \$100,000, and a "Calculate" button. This allows for manual verification of the outputs and provides a clear DOM structure for test automation.

## Formula & Logic
The application logic follows these calculations:
- `variance = current% - target%`
- `cashDelta = totalAsset * (variance / 100)`
- `shares = Math.trunc(cashDelta / unitPrice)`

## Assessment Highlights
Architecture:Page Object Model (POM) for clean separation of concerns.
Selectors: Use of `data-testid` attributes for robust and stable element identification.
Coverage: Verification of primary scenarios (zero variance, buy, and sell operations) and initial application state.

## Future Improvements
While the current implementation fulfills the core requirements within the recommended 2-4 hour window, the following areas have been identified for future improvement

### Advanced Testing Strategies
Decoupling Logic:Currently, tests replicate the application's internal formula. Moving forward, I would implement hardcoded expected values (e.g., specific share counts for given inputs) to ensure independent verification and avoid "false positives" where both the test and application share the same logic error.
- Boundary & Negative Testing:Expanding coverage for critical edge cases:
    - `unit price = 0` (preventing division by zero errors).
    - Invalid or empty user inputs.
    - Scenarios where `target%` or `current%` do not sum to 100%.
    - Overflow scenarios with very large numbers.

### Test Structure & E2E Coverage
- Refactoring: Moving from the current `for..of` loop to `test.describe` parameterization. This ensures better test isolation, where a failure in one security does not mask results for others.
- End-to-End Workflow: Implementing a full-portfolio reconciliation test to verify that the sum of `cashDelta` across all securities equals zero.
- Dynamic Interaction: Adding test cases for "edit and recalculate" workflows to verify UI responsiveness to user input changes.

### Environment & Configuration
- Finalizing `playwright.config.ts` and `tsconfig.json` to ensure a seamless "out-of-the-box" execution experience.

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npm test
npm run test:headed
npm run test:debug
```
