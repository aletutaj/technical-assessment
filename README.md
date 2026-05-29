## Assumptions

1. Calculations truncated to the nearest whole number.

2. No Extra Costs

## Test Environment 
For testing purposes, a simple UI was built consisting of a data table with the 5 required securities (IBM, MSFT, ORCL, AAPL, HD),a total asset value of \$100,000, and a "Calculate" button. This allows for manual verification of the outputs and provides a clear DOM structure for test automation.

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
