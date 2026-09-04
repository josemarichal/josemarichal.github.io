document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const totalBudgetDisplay = document.getElementById('totalBudgetDisplay');
    const mandatedDisplay = document.getElementById('mandatedDisplay');
    const balanceTracker = document.getElementById('balanceTracker');
    const balanceBox = document.getElementById('balanceBox');
    
    const slidersContainer = document.getElementById('slidersContainer');
    const mandatedList = document.getElementById('mandatedList');
    
    let budgetChart = null;
    let currentCity = citySelect.value;
    let initialDiscretionaryTotal = 0;
    
    // Format number as currency
    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    };

    const loadCityData = (cityName) => {
        currentCity = cityName;
        const data = budgetData[cityName];
        
        // Calculate totals
        let mandatedTotal = 0;
        for (const [key, value] of Object.entries(data.mandated)) {
            mandatedTotal += value;
        }
        
        initialDiscretionaryTotal = 0;
        for (const [key, details] of Object.entries(data.discretionary)) {
            initialDiscretionaryTotal += details.current;
        }
        
        // Update summary displays
        totalBudgetDisplay.textContent = formatCurrency(data.totalBudget);
        mandatedDisplay.textContent = formatCurrency(mandatedTotal);
        
        renderMandatedList(data.mandated);
        renderSliders(data.discretionary);
        updateBalance();
        renderChart();
    };

    const renderMandatedList = (mandatedData) => {
        mandatedList.innerHTML = '';
        for (const [name, amount] of Object.entries(mandatedData)) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="mandated-item-name">${name}</span>
                <span class="mandated-item-value">${formatCurrency(amount)}</span>
            `;
            mandatedList.appendChild(li);
        }
    };

    const renderSliders = (discretionaryData) => {
        slidersContainer.innerHTML = '';
        
        for (const [name, details] of Object.entries(discretionaryData)) {
            const group = document.createElement('div');
            group.className = 'slider-group';
            
            const safeId = name.replace(/[^a-zA-Z0-9]/g, '-');
            
            group.innerHTML = `
                <div class="slider-header">
                    <span class="slider-label">${name}</span>
                    <span class="slider-value" id="val-${safeId}">${formatCurrency(details.current)}</span>
                </div>
                <input type="range" 
                       id="slider-${safeId}" 
                       data-category="${name}" 
                       min="${details.min}" 
                       max="${details.max}" 
                       step="100000" 
                       value="${details.current}">
            `;
            
            slidersContainer.appendChild(group);
            
            // Add event listener
            const slider = group.querySelector('input');
            slider.addEventListener('input', (e) => {
                const newValue = parseInt(e.target.value);
                budgetData[currentCity].discretionary[name].current = newValue;
                document.getElementById(`val-${safeId}`).textContent = formatCurrency(newValue);
                updateBalance();
                renderChart();
            });
        }
    };

    const updateBalance = () => {
        let currentDiscretionaryTotal = 0;
        for (const details of Object.values(budgetData[currentCity].discretionary)) {
            currentDiscretionaryTotal += details.current;
        }
        
        const difference = initialDiscretionaryTotal - currentDiscretionaryTotal;
        
        balanceBox.classList.remove('deficit', 'surplus');
        
        if (difference < 0) {
            balanceTracker.textContent = formatCurrency(difference) + " (Deficit)";
            balanceBox.classList.add('deficit');
        } else if (difference > 0) {
            balanceTracker.textContent = "+" + formatCurrency(difference) + " (Surplus)";
            balanceBox.classList.add('surplus');
        } else {
            balanceTracker.textContent = "$0";
        }
    };

    const renderChart = () => {
        const data = budgetData[currentCity];
        
        // Prepare labels and data for chart
        const labels = [];
        const chartValues = [];
        const backgroundColors = [];
        
        // Add Discretionary
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];
        let colorIndex = 0;
        
        for (const [name, details] of Object.entries(data.discretionary)) {
            labels.push(name);
            chartValues.push(details.current);
            backgroundColors.push(colors[colorIndex % colors.length]);
            colorIndex++;
        }
        
        // Add Mandated
        for (const [name, amount] of Object.entries(data.mandated)) {
            labels.push(`[Locked] ${name}`);
            chartValues.push(amount);
            backgroundColors.push('#ef4444'); // Red for mandated
        }
        
        const ctx = document.getElementById('budgetChart').getContext('2d');
        
        if (budgetChart) {
            budgetChart.destroy();
        }
        
        budgetChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: chartValues,
                    backgroundColor: backgroundColors,
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: { family: 'Inter', size: 12 },
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.raw !== null) {
                                    label += formatCurrency(context.raw);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    };

    // Initialization
    citySelect.addEventListener('change', (e) => {
        loadCityData(e.target.value);
    });
    
    // Load initial city
    loadCityData(citySelect.value);
});
