// State Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

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
        // Cache Buster: Adds a unique timestamp to the URL to prevent browser caching
        const bustCache = new Date().getTime();
        
        // Fetching from the data branch with cache buster
        const response = await fetch(`https://raw.githubusercontent.com/matrixrex/Mahar-Calculator/data/price.json?t=${bustCache}`);
        
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
    
    // Use pre-calculated values from API if available, otherwise fallback to client-side calculation
    const fatemiMahr = data.mahr_fatemi || (pricePerGram * 1530.9);
    const minMahr = data.minimum_mahr || (pricePerGram * 30.618);

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

// Mouse Tracking for Glow Effect with Smooth Lag
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    // Linear interpolation (lerp) for smooth lag
    // The 0.03 factor determines the speed/lag. Lower = more lag.
    cursorX += (mouseX - cursorX) * 0.03;
    cursorY += (mouseY - cursorY) * 0.03;

    document.body.style.setProperty('--mouse-x', `${cursorX}px`);
    document.body.style.setProperty('--mouse-y', `${cursorY}px`);

    requestAnimationFrame(animateGlow);
}

animateGlow();

// Init
fetchPrice();

// Share Functionality
const shareToggle = document.getElementById('share-toggle');
const shareDropdown = document.getElementById('share-dropdown');
const btnDownload = document.getElementById('btn-download');
const btnCopy = document.getElementById('btn-copy');

// Toggle Dropdown
shareToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    shareDropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!shareDropdown.contains(e.target) && !shareToggle.contains(e.target)) {
        shareDropdown.classList.add('hidden');
    }
});

// Generate Share Image
function generateShareImage() {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 600;
        const padding = 50;
        const cornerRadius = 40;
        
        canvas.width = size;
        canvas.height = size;
        
        // Detect theme
        const isDark = document.documentElement.classList.contains('dark');
        
        // Theme colors
        const bgColor = isDark ? '#121212' : '#F8F9FA';
        const primaryColor = isDark ? '#FFFFFF' : '#0F5132';
        const accentColor = '#D4AF37'; // Gold
        const subtleColor = isDark ? '#9CA3AF' : '#6B7280';
        // Pattern color: grayscale on light, white on dark (like the CSS filter)
        const patternColor = isDark ? '#FFFFFF' : '#000000';
        const patternOpacity = isDark ? 0.02 : 0.03; // Lower opacity for dark mode to improve readability
        
        // Draw rounded rectangle background
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.roundRect(0, 0, size, size, cornerRadius);
        ctx.fill();
        
        // Load and draw pattern
        const patternImg = new Image();
        patternImg.onload = () => {
            // Create pattern with colored SVG
            const patternCanvas = document.createElement('canvas');
            const patternCtx = patternCanvas.getContext('2d');
            const patternSize = 150; // Smaller for the share card
            patternCanvas.width = patternSize;
            patternCanvas.height = patternSize;
            
            // Draw pattern scaled
            patternCtx.drawImage(patternImg, 0, 0, patternSize, patternSize);
            
            // Apply color using composite operation
            patternCtx.globalCompositeOperation = 'source-in';
            patternCtx.fillStyle = patternColor;
            patternCtx.fillRect(0, 0, patternSize, patternSize);
            
            // Save current state and clip to rounded rect
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(0, 0, size, size, cornerRadius);
            ctx.clip();
            
            // Draw pattern tiled with opacity
            ctx.globalAlpha = patternOpacity;
            const pattern = ctx.createPattern(patternCanvas, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, size, size);
            ctx.globalAlpha = 1;
            ctx.restore();
            
            // Draw the text content on top
            drawTextContent();
        };
        
        patternImg.onerror = () => {
            // If pattern fails to load, just draw content without pattern
            drawTextContent();
        };
        
        // Load the SVG pattern
        patternImg.src = 'assets/bg-pattern.svg';
        
        function drawTextContent() {
            // Add subtle border
            ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,81,50,0.1)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(0, 0, size, size, cornerRadius);
            ctx.stroke();
            
            // Get current values from DOM
            const fatemiMahrText = document.getElementById('price-display').innerText || '-- টাকা';
            const perGramText = document.getElementById('per-gram-display')?.innerText || '--';
            
            // Title
            ctx.fillStyle = primaryColor;
            ctx.font = 'bold 36px "Tiro Bangla", serif';
            ctx.textAlign = 'center';
            ctx.fillText('আজকের মহরে ফাতেমি', size / 2, 100);
            
            // Main Price
            ctx.fillStyle = accentColor;
            ctx.font = 'bold 64px "Tiro Bangla", serif';
            ctx.fillText(fatemiMahrText, size / 2, 220);
            
            // Description
            ctx.fillStyle = subtleColor;
            ctx.font = '22px "Tiro Bangla", serif';
            ctx.fillText('৫০০ দিরহাম = ১,৫৩০.৯ গ্রাম রৌপ্য', size / 2, 280);
            
            // Divider line
            ctx.beginPath();
            ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(15,81,50,0.15)';
            ctx.lineWidth = 1;
            ctx.moveTo(padding + 50, 330);
            ctx.lineTo(size - padding - 50, 330);
            ctx.stroke();
            
            // Silver Price Per Gram
            ctx.fillStyle = primaryColor;
            ctx.font = 'bold 28px "Tiro Bangla", serif';
            ctx.fillText('রুপা প্রতি গ্রাম', size / 2, 390);
            
            ctx.fillStyle = accentColor;
            ctx.font = 'bold 48px "Tiro Bangla", serif';
            ctx.fillText('৳ ' + perGramText, size / 2, 450);
            
            // Date
            const today = new Date();
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = today.toLocaleDateString('bn-BD', dateOptions);
            ctx.fillStyle = subtleColor;
            ctx.font = '20px "Tiro Bangla", serif';
            ctx.fillText(formattedDate, size / 2, 510);
            
            // Site URL at bottom
            ctx.fillStyle = isDark ? 'rgba(212,175,55,0.7)' : 'rgba(15,81,50,0.6)';
            ctx.font = '18px sans-serif';
            ctx.fillText('matrixrex.github.io/Mahar-Calculator', size / 2, 560);
            
            // Convert to blob
            canvas.toBlob((blob) => {
                resolve({ blob, dataUrl: canvas.toDataURL('image/png') });
            }, 'image/png');
        }
    });
}

// Download Image
btnDownload.addEventListener('click', async () => {
    shareDropdown.classList.add('hidden');
    const { dataUrl } = await generateShareImage();
    
    const link = document.createElement('a');
    link.download = `mohor-fatemi-${new Date().toISOString().split('T')[0]}.png`;
    link.href = dataUrl;
    link.click();
});

// Copy Image to Clipboard
btnCopy.addEventListener('click', async () => {
    shareDropdown.classList.add('hidden');
    
    try {
        const { blob } = await generateShareImage();
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]);
        
        // Visual feedback - temporarily change icon
        const copyIcon = btnCopy.querySelector('i');
        const originalClass = copyIcon.className;
        copyIcon.className = 'ph ph-check text-lg';
        setTimeout(() => {
            copyIcon.className = originalClass;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy image:', err);
        alert('ছবি কপি করতে ব্যর্থ হয়েছে। অনুগ্রহ করে ডাউনলোড করুন।');
    }
});