// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const floatingCard = document.querySelector('.floating-card');
    
    if (hero && floatingCard) {
        const rate = scrolled * -0.5;
        floatingCard.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Form validation (if you add a contact form later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Add click outside to close mobile menu
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Navbar background change logic
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add service worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Dashboard initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadSampleData();
    setupEventListeners();
    updateCurrentDate();
});

// Initialize dashboard components
function initializeDashboard() {
    console.log('Initializing K-Literature Translation Intelligence Platform...');
    
    // Set up navigation
    setupNavigation();
    
    // Initialize charts and visualizations
    initializeCharts();
    
    // Set up prediction tool
    setupPredictionTool();
    
    // Load ranking table
    populateRankingTable();
    
    // Set up sidebar interactions
    setupSidebarInteractions();
}

// Set up navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Apply filter to ranking table
            applyFilter(filter);
            
            // Update metrics based on filter
            updateMetrics(filter);
        });
    });
}

// Apply filter to ranking table
function applyFilter(filter) {
    const tbody = document.getElementById('ranking-tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        let show = true;
        
        switch(filter) {
            case 'candidates':
                // Show only high-potential candidates
                const score = parseFloat(row.querySelector('.final-score').textContent);
                show = score > 75;
                break;
            case 'popularity':
                // Show only popular books
                const successSim = parseFloat(row.querySelector('.success-sim').textContent);
                show = successSim > 80;
                break;
            case 'nyt-similarity':
                // Show only books with high NYT similarity
                const nytSim = parseFloat(row.querySelector('.nyt-sim').textContent);
                show = nytSim > 70;
                break;
            case 'all':
            default:
                show = true;
                break;
        }
        
        row.style.display = show ? 'table-row' : 'none';
    });
}

// Update metrics based on filter
function updateMetrics(filter) {
    // This would typically fetch new data from the backend
    // For now, we'll simulate metric updates
    const metrics = document.querySelectorAll('.metric-value');
    
    metrics.forEach(metric => {
        // Add a subtle animation to show the metric is updating
        metric.style.transform = 'scale(1.1)';
        setTimeout(() => {
            metric.style.transform = 'scale(1)';
        }, 200);
    });
}

// Initialize charts and visualizations
function initializeCharts() {
    // Initialize trend chart
    initializeTrendChart();
    
    // Initialize bubble chart animations
    initializeBubbleChart();
    
    // Initialize sentiment chart
    initializeSentimentChart();
}

// Initialize trend chart
function initializeTrendChart() {
    const canvas = document.getElementById('trend-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Sample data for successful books by publication year
    const data = [
        { year: 2015, count: 12 },
        { year: 2016, count: 18 },
        { year: 2017, count: 15 },
        { year: 2018, count: 22 },
        { year: 2019, count: 28 },
        { year: 2020, count: 35 },
        { year: 2021, count: 42 },
        { year: 2022, count: 38 },
        { year: 2023, count: 45 }
    ];
    
    // Draw simple bar chart
    const maxCount = Math.max(...data.map(d => d.count));
    const barWidth = canvas.width / data.length - 10;
    const barHeight = canvas.height - 40;
    
    ctx.fillStyle = '#4299e1';
    data.forEach((item, index) => {
        const height = (item.count / maxCount) * barHeight;
        const x = index * (barWidth + 10) + 5;
        const y = canvas.height - height - 20;
        
        ctx.fillRect(x, y, barWidth, height);
        
        // Add year labels
        ctx.fillStyle = '#4a5568';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(item.year.toString(), x + barWidth/2, canvas.height - 5);
        ctx.fillStyle = '#4299e1';
    });
}

// Initialize bubble chart
function initializeBubbleChart() {
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach((bubble, index) => {
        // Add staggered animation delays
        bubble.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize sentiment chart
function initializeSentimentChart() {
    const sentimentBars = document.querySelectorAll('.sentiment-bar .bar-fill');
    
    sentimentBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Set up prediction tool
function setupPredictionTool() {
    const searchInput = document.getElementById('book-search');
    const predictBtn = document.querySelector('.predict-btn');
    
    predictBtn.addEventListener('click', function() {
        const bookTitle = searchInput.value.trim();
        
        if (bookTitle) {
            performPrediction(bookTitle);
        } else {
            showPredictionError('Please enter a book title or ISBN');
        }
    });
    
    // Allow Enter key to trigger prediction
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            predictBtn.click();
        }
    });
}

// Perform book prediction
function performPrediction(bookTitle) {
    // Show loading state
    const predictBtn = document.querySelector('.predict-btn');
    const originalText = predictBtn.innerHTML;
    predictBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    predictBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Generate random prediction scores
        const successSim = Math.floor(Math.random() * 30) + 70; // 70-100
        const salesPoint = (Math.random() * 3 + 6).toFixed(1); // 6.0-9.0
        const nytSim = Math.floor(Math.random() * 25) + 65; // 65-90
        const finalScore = Math.floor((successSim + parseFloat(salesPoint) * 10 + nytSim) / 3);
        
        // Update prediction result
        updatePredictionResult({
            successSim: successSim,
            salesPoint: salesPoint,
            nytSim: nytSim,
            finalScore: finalScore
        });
        
        // Reset button
        predictBtn.innerHTML = originalText;
        predictBtn.disabled = false;
        
        // Trigger book animation
        triggerBookAnimation();
        
    }, 2000);
}

// Update prediction result display
function updatePredictionResult(scores) {
    const resultCard = document.querySelector('.result-content');
    
    // Update success score
    const scoreValue = resultCard.querySelector('.score-value');
    scoreValue.textContent = `${scores.finalScore}%`;
    
    // Update breakdown
    const breakdownItems = resultCard.querySelectorAll('.breakdown-item span:last-child');
    breakdownItems[0].textContent = `${scores.successSim}%`;
    breakdownItems[1].textContent = scores.salesPoint;
    breakdownItems[2].textContent = `${scores.nytSim}%`;
    
    // Update prediction message
    const predictionMessage = resultCard.querySelector('h3');
    if (scores.finalScore >= 80) {
        predictionMessage.textContent = '번역한다면 흥행할 가능성이 높습니다';
        predictionMessage.style.color = '#38a169';
    } else if (scores.finalScore >= 60) {
        predictionMessage.textContent = '번역 가능성이 보통입니다';
        predictionMessage.style.color = '#d69e2e';
    } else {
        predictionMessage.textContent = '번역 시 주의가 필요합니다';
        predictionMessage.style.color = '#e53e3e';
    }
    
    // Add success animation
    resultCard.style.transform = 'scale(1.02)';
    setTimeout(() => {
        resultCard.style.transform = 'scale(1)';
    }, 200);
}

// Trigger book page animation
function triggerBookAnimation() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.style.transform = 'rotateY(-30deg)';
            setTimeout(() => {
                page.style.transform = 'rotateY(0deg)';
            }, 300);
        }, index * 200);
    });
}

// Show prediction error
function showPredictionError(message) {
    const resultCard = document.querySelector('.result-content');
    const predictionMessage = resultCard.querySelector('h3');
    
    predictionMessage.textContent = message;
    predictionMessage.style.color = '#e53e3e';
    
    // Reset after 3 seconds
    setTimeout(() => {
        predictionMessage.textContent = '번역한다면 흥행할 가능성이 높습니다';
        predictionMessage.style.color = '#2b6cb0';
    }, 3000);
}

// Populate ranking table with sample data
function populateRankingTable() {
    const tbody = document.getElementById('ranking-tbody');
    
    // Sample data for Korean books
    const sampleBooks = [
        {
            rank: 1,
            isbn: '9788932917245',
            title: '채식주의자',
            author: '한강',
            year: 2007,
            successSim: 92.5,
            salesPoint: 8.7,
            nytSim: 85.3,
            finalScore: 88.8
        },
        {
            rank: 2,
            isbn: '9788932917246',
            title: '흰',
            author: '한강',
            year: 2016,
            successSim: 89.2,
            salesPoint: 8.3,
            nytSim: 82.1,
            finalScore: 86.5
        },
        {
            rank: 3,
            isbn: '9788932917247',
            title: '소년이 온다',
            author: '한강',
            year: 2014,
            successSim: 87.8,
            salesPoint: 8.1,
            nytSim: 79.4,
            finalScore: 85.1
        },
        {
            rank: 4,
            isbn: '9788932917248',
            title: '엄마를 부탁해',
            author: '신경숙',
            year: 2008,
            successSim: 85.6,
            salesPoint: 7.9,
            nytSim: 77.2,
            finalScore: 83.6
        },
        {
            rank: 5,
            isbn: '9788932917249',
            title: '외딴방',
            author: '신경숙',
            year: 1995,
            successSim: 83.4,
            salesPoint: 7.6,
            nytSim: 75.8,
            finalScore: 82.3
        }
    ];
    
    tbody.innerHTML = '';
    
    sampleBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.rank}</td>
            <td>${book.isbn}</td>
            <td><i class="fas fa-book" style="color: #4299e1;"></i></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td class="success-sim">${book.successSim}%</td>
            <td class="sales-point">${book.salesPoint}</td>
            <td class="nyt-sim">${book.nytSim}%</td>
            <td class="final-score">${book.finalScore}</td>
        `;
        
        // Add click event for detailed view
        row.addEventListener('click', () => {
            showBookDetail(book);
        });
        
        tbody.appendChild(row);
    });
}

// Show book detail in sidebar
function showBookDetail(book) {
    const bookDetail = document.getElementById('book-detail');
    
    bookDetail.innerHTML = `
        <div class="book-cover">
            <i class="fas fa-book" style="font-size: 3rem; color: #4299e1;"></i>
        </div>
        <div class="book-info">
            <h4>${book.title}</h4>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Published:</strong> ${book.year}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <div class="book-scores">
                <div class="score-item">
                    <span>Success Sim.</span>
                    <span>${book.successSim}%</span>
                </div>
                <div class="score-item">
                    <span>Sales Point</span>
                    <span>${book.salesPoint}</span>
                </div>
                <div class="score-item">
                    <span>NYT Sim.</span>
                    <span>${book.nytSim}%</span>
                </div>
                <div class="score-item final">
                    <span>Final Score</span>
                    <span>${book.finalScore}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add animation
    bookDetail.style.transform = 'scale(0.95)';
    setTimeout(() => {
        bookDetail.style.transform = 'scale(1)';
    }, 100);
}

// Set up sidebar interactions
function setupSidebarInteractions() {
    // Sort functionality
    const sortSelect = document.getElementById('sidebar-sort');
    sortSelect.addEventListener('change', function() {
        sortRankingTable(this.value);
    });
    
    // Export functionality
    const exportBtn = document.querySelector('.export-btn');
    exportBtn.addEventListener('click', function() {
        exportRankingData();
    });
    
    // Curation tool
    const curateBtn = document.querySelector('.curate-btn');
    curateBtn.addEventListener('click', function() {
        performCuration();
    });
}

// Sort ranking table
function sortRankingTable(sortBy) {
    const tbody = document.getElementById('ranking-tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch(sortBy) {
            case 'success-sim':
                aValue = parseFloat(a.querySelector('.success-sim').textContent);
                bValue = parseFloat(b.querySelector('.success-sim').textContent);
                break;
            case 'sales-point':
                aValue = parseFloat(a.querySelector('.sales-point').textContent);
                bValue = parseFloat(b.querySelector('.sales-point').textContent);
                break;
            case 'nyt-sim':
                aValue = parseFloat(a.querySelector('.nyt-sim').textContent);
                bValue = parseFloat(b.querySelector('.nyt-sim').textContent);
                break;
            case 'final-score':
            default:
                aValue = parseFloat(a.querySelector('.final-score').textContent);
                bValue = parseFloat(b.querySelector('.final-score').textContent);
                break;
        }
        
        return bValue - aValue; // Descending order
    });
    
    // Reorder rows
    rows.forEach((row, index) => {
        const rankCell = row.querySelector('td:first-child');
        rankCell.textContent = index + 1;
        tbody.appendChild(row);
    });
}

// Export ranking data
function exportRankingData() {
    const table = document.querySelector('.ranking-table');
    const rows = Array.from(table.querySelectorAll('tr'));
    
    let csv = 'Rank,ISBN,Title,Author,Published Year,Success Sim,Sales Point,NYT Sim,Final Score\n';
    
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        const rowData = cells.map(cell => {
            let text = cell.textContent.trim();
            // Escape quotes in CSV
            if (text.includes(',')) {
                text = `"${text}"`;
            }
            return text;
        });
        csv += rowData.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'k-literature-ranking.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Perform curation
function performCuration() {
    const curateBtn = document.querySelector('.curate-btn');
    const originalText = curateBtn.innerHTML;
    
    curateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Curating...';
    curateBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate curation results
        showCurationResults();
        
        curateBtn.innerHTML = originalText;
        curateBtn.disabled = false;
    }, 2000);
}

// Show curation results
function showCurationResults() {
    // This would typically show a modal or update the sidebar
    // For now, we'll just show an alert
    alert('Similar books curated! Check the ranking table for updated recommendations.');
}

// Load sample data for translated books
function loadSampleData() {
    const translatedList = document.getElementById('translated-list');
    
    const sampleTranslated = [
        { rank: 1, title: 'The Vegetarian', author: 'Han Kang', bsr: 'Top 1%' },
        { rank: 2, title: 'Human Acts', author: 'Han Kang', bsr: 'Top 2%' },
        { rank: 3, title: 'Please Look After Mom', author: 'Shin Kyung-sook', bsr: 'Top 3%' },
        { rank: 4, title: 'The Hen Who Dreamed She Could Fly', author: 'Sun-mi Hwang', bsr: 'Top 5%' },
        { rank: 5, title: 'The Guest', author: 'Hwang Sok-yong', bsr: 'Top 8%' }
    ];
    
    translatedList.innerHTML = '';
    
    sampleTranslated.forEach(book => {
        const item = document.createElement('div');
        item.className = 'translated-item';
        item.innerHTML = `
            <div class="translated-rank">${book.rank}</div>
            <div class="translated-info">
                <div class="translated-title">${book.title}</div>
                <div class="translated-author">${book.author}</div>
            </div>
            <div class="translated-bsr">${book.bsr}</div>
        `;
        translatedList.appendChild(item);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.addEventListener('click', function() {
        refreshData();
    });
    
    // Table sort
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', function() {
        sortRankingTable(this.value);
    });
    
    // Window resize
    window.addEventListener('resize', function() {
        // Reinitialize charts on resize
        initializeTrendChart();
    });
}

// Refresh data
function refreshData() {
    const refreshBtn = document.querySelector('.refresh-btn');
    const icon = refreshBtn.querySelector('i');
    
    // Add spinning animation
    icon.className = 'fas fa-spinner fa-spin';
    
    setTimeout(() => {
        // Reload data
        loadSampleData();
        populateRankingTable();
        
        // Reset icon
        icon.className = 'fas fa-sync-alt';
        
        // Show success message
        showNotification('Data refreshed successfully!', 'success');
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#38a169' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update current date
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS for additional styling
const additionalStyles = `
    .book-info {
        margin-top: 1rem;
    }
    
    .book-info h4 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #1a202c;
    }
    
    .book-info p {
        font-size: 0.9rem;
        color: #4a5568;
        margin-bottom: 0.25rem;
    }
    
    .book-scores {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .score-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: #f7fafc;
        border-radius: 6px;
        font-size: 0.9rem;
    }
    
    .score-item.final {
        background: #ebf8ff;
        font-weight: 600;
        color: #2b6cb0;
    }
    
    .translated-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: #f7fafc;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
    }
    
    .translated-rank {
        width: 24px;
        height: 24px;
        background: #4299e1;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .translated-info {
        flex: 1;
    }
    
    .translated-title {
        font-weight: 600;
        color: #1a202c;
        font-size: 0.9rem;
    }
    
    .translated-author {
        font-size: 0.8rem;
        color: #718096;
    }
    
    .translated-bsr {
        font-size: 0.8rem;
        color: #38a169;
        font-weight: 600;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('K-Literature Translation Intelligence Platform loaded successfully!'); 