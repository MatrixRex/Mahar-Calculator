// State Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initial Theme Check
// Initial Theme Check
if (localStorage.theme === 'dark') {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

// Theme Toggle Handler
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
});

// Data Fetching & Calculation
async function fetchPrice() {
    try {
        const response = await fetch('./price.json');
        if (!response.ok) throw new Error('Price data not found');
        
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching price:', error);
        // Keep loading state or show error
        document.getElementById('loading-price').innerText = "Error Loading Data";
    }
}

function updateUI(data) {
    const priceInBDT = data.price; // Price of 1 Troy Oz Silver in BDT
    const pricePerGram = priceInBDT / 31.1035;
    
    const fatemiMahr = pricePerGram * 1530.9;
    const minMahr = pricePerGram * 30.618;

    // Formatter (Number only)
    const formatter = new Intl.NumberFormat('bn-BD', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    // Update DOM
    document.getElementById('loading-price').classList.add('hidden');
    const priceDisplay = document.getElementById('price-display');
    priceDisplay.classList.remove('hidden');
    priceDisplay.innerText = formatter.format(fatemiMahr) + ' টাকা';

    document.getElementById('min-mahr-display').innerText = formatter.format(minMahr) + ' টাকা';

    // Per Gram Rate
    const perGramContainer = document.getElementById('per-gram-container');
    const perGramDisplay = document.getElementById('per-gram-display');
    if (perGramContainer && perGramDisplay) {
        perGramContainer.classList.remove('hidden');
        perGramDisplay.innerText = formatter.format(pricePerGram);
    }

    // Date Formatting
    const date = new Date(data.timestamp * 1000);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('last-updated').innerHTML = `
        <i class="ph ph-clock"></i>
        <span>সর্বশেষ আপডেট: ${date.toLocaleDateString('bn-BD', dateOptions)}</span>
    `;
}

// Init
fetchPrice();
