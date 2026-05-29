const tbody = document.getElementById('portfolio-body');
const totalAssetInput = document.getElementById('total-asset');

const initialSecurities = [
    { symbol: 'IBM',  targetPct: 20, currentPct: 10, unitPrice: 150 },
    { symbol: 'MSFT', targetPct: 20, currentPct: 20, unitPrice: 90 },
    { symbol: 'ORCL', targetPct: 20, currentPct: 30, unitPrice: 220 },
    { symbol: 'AAPL', targetPct: 20, currentPct: 20, unitPrice: 450 },
    { symbol: 'HD',   targetPct: 20, currentPct: 20, unitPrice: 70 }
];

function renderTable() {
    tbody.innerHTML = '';
    initialSecurities.forEach((sec) => {
        const row = document.createElement('tr');
        row.setAttribute('data-testid', `row-${sec.symbol.toLowerCase()}`);
        row.innerHTML = `
            <td><strong>${sec.symbol}</strong></td>
            <td><input type="number" class="edit-target" value="${sec.targetPct}" data-testid="${sec.symbol.toLowerCase()}-target-input"></td>
            <td><input type="number" class="edit-current" value="${sec.currentPct}" data-testid="${sec.symbol.toLowerCase()}-current-input"></td>
            <td class="variance-cell" data-testid="${sec.symbol.toLowerCase()}-variance"></td>
            <td><input type="number" class="edit-price" value="${sec.unitPrice}" data-testid="${sec.symbol.toLowerCase()}-price-input"></td>
            <td class="output-cell" data-testid="${sec.symbol.toLowerCase()}-output"></td>
            <td><button class="row-btn" data-testid="${sec.symbol.toLowerCase()}-calc-button">Calculate</button></td>
        `;

        tbody.appendChild(row);

        const btn = row.querySelector('.row-btn');
        btn.addEventListener('click', () => {
            const totalAsset = parseFloat(totalAssetInput.value);
            const targetPct = parseFloat(row.querySelector('.edit-target').value);
            const currentPct = parseFloat(row.querySelector('.edit-current').value);
            const unitPrice = parseFloat(row.querySelector('.edit-price').value);

            const variance = currentPct - targetPct;
            const cashDelta = totalAsset * (variance / 100);
            const shares = Math.trunc(cashDelta / unitPrice);

            row.querySelector('.variance-cell').innerText = variance + '%';
            row.querySelector('.output-cell').innerText = (shares > 0 ? '+' : '') + shares;
        });
    });
}

renderTable();