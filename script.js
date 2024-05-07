const loans = {
    'あやせ': {'そうま': 0, 'しんのすけ': 0},
    'そうま': {'あやせ': 10, 'しんのすけ': 3},
    'しんのすけ': {'あやせ': 3, 'そうま': 0}
};

function updateGraph() {
    const container = document.getElementById('graphContainer');
    container.innerHTML = '';

    // Draw circles for each person
    const positions = {
        'あやせ': {top: '10px', left: '100px'},
        'そうま': {top: '260px', left: '10px'},
        'しんのすけ': {top: '260px', left: '190px'}
    };

    for (const name in positions) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.top = positions[name].top;
        circle.style.left = positions[name].left;
        circle.innerText = name;
        container.appendChild(circle);
    }

    // Draw lines between circles based on loans
    function drawLine(from, to) {
        const fromPos = positions[from];
        const toPos = positions[to];
        const x1 = parseInt(fromPos.left) + 25; // Center of circle
        const y1 = parseInt(fromPos.top) + 25; // Center of circle
        const x2 = parseInt(toPos.left) + 25; // Center of circle
        const y2 = parseInt(toPos.top) + 25; // Center of circle

        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        const line = document.createElement('div');
        line.className = 'line';
        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0';
        container.appendChild(line);
    }

    for (const lender in loans) {
        for (const borrower in loans[lender]) {
            if (loans[lender][borrower] > 0) {
                drawLine(lender, borrower);
            }
        }
    }
}

function registerLoan() {
    const lender = document.getElementById('lender').value;
    const borrower = document.getElementById('borrower').value;
    if (lender !== borrower) {
        loans[lender][borrower] = (loans[lender][borrower] || 0) + 1;
        updateGraph();
    }
}

function registerBorrow() {
    registerLoan();  // Simply reverse lender and borrower
}

function completeRepayment() {
    const lender = document.getElementById('lender').value;
    const borrower = document.getElementById('borrower').value;
    if (lender !== borrower && loans[lender][borrower] > 0) {
        loans[lender][borrower]--;
        updateGraph();
    }
}

updateGraph();
