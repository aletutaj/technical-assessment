## Assumptions

1. Calculations truncated to the nearest whole number.
2. No Extra Costs

## Test Environment

For testing purposes, a simple UI was built consisting of a data table with the 5 required securities (IBM, MSFT, ORCL,
AAPL, HD),a total asset value of \$100,000, and a "Calculate" button. This allows for manual verification of the outputs
and provides a clear DOM structure for test automation.

## Formula & Logic

The application logic follows these calculations:

- `variance = current% - target%`
- `cashDelta = totalAsset * (variance / 100)`
- `shares = Math.trunc(cashDelta / unitPrice)`

*Note: Negative variance results in a "buy" signal and positive variance in a "sell" signal. This is a deliberate design
choice to maintain consistency in share calculations.*

## Assessment Highlights

- Architecture: Page Object Model (POM) for clean separation of concerns.
- Data-Driven Testing: Tests are decoupled from the application logic using hardcoded expected values
- Portfolio Integrity: Implemented E2E reconciliation tests verifying that net cash delta is balanced and budget limits
  are respected
- Selectors: Use of `data-testid` attributes for robust and stable element identification.
- Robustness: Tests utilize `test.describe` parameterization for full isolation
- Coverage: Verification of primary scenarios (zero variance, buy, and sell operations) and initial application state.

## Future Improvements

- Boundary & Negative Testing: Expanding coverage for critical edge cases:
    - `unit price = 0` (division by zero handling).
    - Invalid or empty user inputs.
    - Scenarios where `target%` or `current%` do not sum to 100%.
    - Overflow scenarios with very large numbers.
- Dynamic Interaction: Adding test cases for "edit and recalculate" workflows to verify UI responsiveness to user input
  changes.

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
