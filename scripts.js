let hourlyWage = 0;
let startTime = null;
let endTime = null;
let currencySymbol = '$';
let interval = null;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
}

function showPage(page) {
    document.getElementById('index').style.display = 'none';
    document.getElementById('config').style.display = 'none';
    document.getElementById(page).style.display = 'block';
    toggleSidebar();
}

function startTracking() {
    currencySymbol = document.getElementById('currency').value;
    hourlyWage = parseFloat(document.getElementById('wage').value);
    startTime = document.getElementById('start').value;
    endTime = document.getElementById('end').value;

    if (interval) {
        clearInterval(interval);
    }

    if (hourlyWage > 0 && startTime && endTime) {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const now = new Date();

        const startDate = new Date(now);
        startDate.setHours(startHours, startMinutes, 0, 0);

        const endDate = new Date(now);
        endDate.setHours(endHours, endMinutes, 0, 0);

        if (endDate < startDate) {
            endDate.setDate(endDate.getDate() + 1); // Handle end time past midnight
        }

        interval = setInterval(() => {
            const currentTime = new Date();
            if (currentTime >= startDate && currentTime <= endDate) {
                const elapsed = currentTime - startDate;
                const secondsElapsed = elapsed / 1000;
                const earnings = (hourlyWage / 3600) * secondsElapsed;
                updateMoneyEarned(earnings.toFixed(4));
            } else if (currentTime > endDate) {
                clearInterval(interval);
                const totalEarnings = (hourlyWage / 3600) * ((endDate - startDate) / 1000);
                updateMoneyEarned(totalEarnings.toFixed(4));
            }
        }, 1000);
        
        showPage('index');
    } else {
        alert('Please fill in all fields correctly.');
    }
}

function updateMoneyEarned(amount) {
    const moneyEarnedElement = document.getElementById('moneyEarned');
    const currentAmount = parseFloat(moneyEarnedElement.innerText.replace(currencySymbol, ''));
    const newAmount = parseFloat(amount);
    const increment = newAmount - currentAmount;

    moneyEarnedElement.innerText = `${currencySymbol}${amount}`;

    if (increment > 0) {
        showIncrement(`+${increment.toFixed(4)}`);
    }
}

function showIncrement(incrementText) {
    const moneyDisplay = document.getElementById('moneyDisplay');
    const incrementElement = document.createElement('div');
    incrementElement.className = 'increment';
    incrementElement.innerText = incrementText;

    // Position increment text closer to the total money
    const xPos = Math.random() * 50; // Closer x position
    const yPos = Math.random() * 20 - 10; // Closer y position

    incrementElement.style.left = `${xPos}px`;
    incrementElement.style.top = `${yPos}px`;

    moneyDisplay.appendChild(incrementElement);

    setTimeout(() => {
        incrementElement.remove();
    }, 1000);
}
