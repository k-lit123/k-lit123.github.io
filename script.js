// Global variables for data storage
let koreanBooks = [];
let nytBestsellers = [];
let translationData = [];
let filteredBooks = [];
let currentFilters = {};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadData();
    setupEventListeners();
    setupCharts();
});

// Initialize dashboard components
function initializeDashboard() {
    updateBigNumbers();
    setupNavigation();
    setupFilters();
    setupPredictionTool();
}

// Load data from CSV files
async function loadData() {
    try {
        showNotification('Loading data...', 'info');
        
        // Load Korean books data
        const koreanResponse = await fetch('../book_korean(FINAL).csv');
        const koreanText = await koreanResponse.text();
        koreanBooks = parseCSV(koreanText);
        
        // Load NYT bestsellers data
        const nytResponse = await fetch('../nyt_bestsellers_0618 (2).csv');
        const nytText = await nytResponse.text();
        nytBestsellers = parseCSV(nytText);
        
        // Load translation similarity data
        const transResponse = await fetch('../trans_imdb_2.csv');
        const transText = await transResponse.text();
        translationData = parseCSV(transText);
        
        // Process and merge data
        processData();
        
        // Update UI with real data
        updateRankingTable();
        updateBigNumbers();
        updateCharts();
        updatePersonas();
        
        showNotification('Data loaded successfully!', 'success');
        
    } catch (error) {
        console.error('Error loading data:', error);
        showNotification('Error loading data. Using sample data.', 'error');
        loadSampleData();
    }
}

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim());
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            data.push(row);
        }
    }
    
    return data;
}

// Process and merge data
function processData() {
    // Merge Korean books with translation data
    koreanBooks.forEach(book => {
        const transMatch = translationData.find(t => t.book_title === book.제목);
        if (transMatch) {
            book.similarity_score = parseFloat(transMatch.max_similarity) || 0;
            book.top_similar_books = [
                transMatch.top1_title,
                transMatch.top2_title,
                transMatch.top3_title
            ].filter(Boolean);
        } else {
            book.similarity_score = Math.random() * 0.5 + 0.3; // Random similarity for demo
            book.top_similar_books = [];
        }
        
        // Calculate market potential based on similarity and sales point
        const salesPoint = parseInt(book.salespoint) || 0;
        book.market_potential = Math.min(100, (book.similarity_score * 60) + (salesPoint * 2));
        
        // Calculate translation priority score
        book.translation_priority = (book.similarity_score * 0.4) + (book.market_potential * 0.4) + (Math.random() * 0.2);
    });
    
    // Sort by translation priority
    koreanBooks.sort((a, b) => b.translation_priority - a.translation_priority);
    filteredBooks = [...koreanBooks];
}

// Update big numbers with real data
function updateBigNumbers() {
    const totalBooks = koreanBooks.length;
    const avgSimilarity = koreanBooks.reduce((sum, book) => sum + book.similarity_score, 0) / totalBooks;
    const translationScore = Math.round(koreanBooks.reduce((sum, book) => sum + book.translation_priority, 0) / totalBooks * 100);
    const marketPotential = Math.round(koreanBooks.reduce((sum, book) => sum + book.market_potential, 0) / totalBooks);
    
    document.getElementById('total-books').textContent = totalBooks.toLocaleString();
    document.getElementById('avg-similarity').textContent = avgSimilarity.toFixed(2);
    document.getElementById('translation-score').textContent = translationScore;
    document.getElementById('market-potential').textContent = marketPotential + '%';
}

// Update ranking table with real data
function updateRankingTable() {
    const tbody = document.getElementById('ranking-tbody');
    tbody.innerHTML = '';
    
    filteredBooks.slice(0, 20).forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${book.제목}</td>
            <td>${book.저자}</td>
            <td>${(book.similarity_score * 100).toFixed(1)}%</td>
            <td>${book.market_potential.toFixed(1)}%</td>
            <td>${(book.translation_priority * 100).toFixed(1)}%</td>
        `;
        
        row.addEventListener('click', () => showBookDetails(book));
        tbody.appendChild(row);
    });
}

// Show book details in right sidebar
function showBookDetails(book) {
    document.getElementById('detail-title').textContent = book.제목;
    document.getElementById('detail-author').textContent = book.저자;
    document.getElementById('detail-publisher').textContent = book.출판사;
    document.getElementById('detail-isbn').textContent = book.ISBN;
    document.getElementById('detail-similarity').textContent = (book.similarity_score * 100).toFixed(1) + '%';
    document.getElementById('detail-description').textContent = book.description_cleaned_en || book.description_cleaned || 'No description available';
}

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Apply filter based on category
            const category = link.dataset.category;
            applyCategoryFilter(category);
        });
    });
}

// Apply category filter
function applyCategoryFilter(category) {
    if (category === 'all') {
        filteredBooks = [...koreanBooks];
    } else {
        // Filter based on category (simplified for demo)
        filteredBooks = koreanBooks.filter(book => {
            const description = (book.description_cleaned_en || '').toLowerCase();
            switch (category) {
                case 'fiction':
                    return description.includes('fiction') || description.includes('novel');
                case 'romance':
                    return description.includes('romance') || description.includes('love');
                case 'thriller':
                    return description.includes('thriller') || description.includes('mystery');
                case 'literary':
                    return description.includes('literary') || description.includes('literature');
                default:
                    return true;
            }
        });
    }
    
    updateRankingTable();
    updateBigNumbers();
}

// Setup filters
function setupFilters() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    applyFiltersBtn.addEventListener('click', applyFilters);
    
    // Setup range sliders
    const similarityMin = document.getElementById('similarity-min');
    const similarityMax = document.getElementById('similarity-max');
    const similarityRange = document.getElementById('similarity-range');
    
    function updateSimilarityRange() {
        const min = parseFloat(similarityMin.value);
        const max = parseFloat(similarityMax.value);
        similarityRange.textContent = `${min.toFixed(1)} - ${max.toFixed(1)}`;
    }
    
    similarityMin.addEventListener('input', updateSimilarityRange);
    similarityMax.addEventListener('input', updateSimilarityRange);
    updateSimilarityRange();
}

// Apply filters
function applyFilters() {
    const genreFilter = document.getElementById('genre-filter').value;
    const similarityMin = parseFloat(document.getElementById('similarity-min').value);
    const similarityMax = parseFloat(document.getElementById('similarity-max').value);
    const yearMin = document.getElementById('year-min').value;
    const yearMax = document.getElementById('year-max').value;
    
    filteredBooks = koreanBooks.filter(book => {
        // Genre filter
        if (genreFilter && genreFilter !== '') {
            const description = (book.description_cleaned_en || '').toLowerCase();
            if (genreFilter === 'fiction' && !description.includes('fiction')) return false;
            if (genreFilter === 'romance' && !description.includes('romance')) return false;
            if (genreFilter === 'thriller' && !description.includes('thriller')) return false;
            if (genreFilter === 'literary' && !description.includes('literary')) return false;
        }
        
        // Similarity filter
        if (book.similarity_score < similarityMin || book.similarity_score > similarityMax) {
            return false;
        }
        
        // Year filter
        const bookYear = parseInt(book.발행년도);
        if (yearMin && bookYear < parseInt(yearMin)) return false;
        if (yearMax && bookYear > parseInt(yearMax)) return false;
        
        return true;
    });
    
    updateRankingTable();
    updateBigNumbers();
    showNotification(`Filtered to ${filteredBooks.length} books`, 'info');
}

// Setup prediction tool
function setupPredictionTool() {
    const predictBtn = document.getElementById('predict-btn');
    const bookTitleInput = document.getElementById('book-title-input');
    
    predictBtn.addEventListener('click', () => {
        const title = bookTitleInput.value.trim();
        if (title) {
            predictTranslationSuccess(title);
        } else {
            showNotification('Please enter a book title', 'error');
        }
    });
    
    // Allow Enter key to trigger prediction
    bookTitleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            predictBtn.click();
        }
    });
}

// Predict translation success
function predictTranslationSuccess(title) {
    // Find the book in our data
    const book = koreanBooks.find(b => 
        b.제목.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(b.제목.toLowerCase())
    );
    
    if (book) {
        // Calculate prediction factors
        const similarity = book.similarity_score;
        const appeal = book.market_potential / 100;
        const demand = Math.random() * 0.3 + 0.7; // Simulated demand
        
        const successProbability = Math.round((similarity * 0.4 + appeal * 0.4 + demand * 0.2) * 100);
        
        // Update prediction result
        document.getElementById('success-percentage').textContent = successProbability + '%';
        document.getElementById('similarity-bar').style.width = (similarity * 100) + '%';
        document.getElementById('appeal-bar').style.width = (appeal * 100) + '%';
        document.getElementById('demand-bar').style.width = (demand * 100) + '%';
        
        // Animate book pages
        animateBookPages();
        
        showNotification(`Prediction completed for "${book.제목}"`, 'success');
    } else {
        // Use sample prediction for unknown books
        const similarity = Math.random() * 0.5 + 0.3;
        const appeal = Math.random() * 0.4 + 0.4;
        const demand = Math.random() * 0.3 + 0.6;
        
        const successProbability = Math.round((similarity * 0.4 + appeal * 0.4 + demand * 0.2) * 100);
        
        document.getElementById('success-percentage').textContent = successProbability + '%';
        document.getElementById('similarity-bar').style.width = (similarity * 100) + '%';
        document.getElementById('appeal-bar').style.width = (appeal * 100) + '%';
        document.getElementById('demand-bar').style.width = (demand * 100) + '%';
        
        animateBookPages();
        showNotification(`Prediction completed for "${title}"`, 'success');
    }
}

// Animate book pages
function animateBookPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.animation = 'none';
        setTimeout(() => {
            page.style.animation = `pageFlip 1s ease-in-out ${index * 0.2}s`;
        }, 10);
    });
}

// Setup charts
function setupCharts() {
    // Genre distribution chart
    const genreCtx = document.getElementById('genre-chart').getContext('2d');
    new Chart(genreCtx, {
        type: 'doughnut',
        data: {
            labels: ['Fiction', 'Romance', 'Thriller', 'Literary', 'Other'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
    
    // Bestseller similarity chart
    const bestsellerCtx = document.getElementById('bestseller-chart').getContext('2d');
    new Chart(bestsellerCtx, {
        type: 'bar',
        data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
                label: 'Similarity Level',
                data: [45, 35, 20],
                backgroundColor: [
                    '#48bb78',
                    '#ed8936',
                    '#f56565'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    // Sentiment analysis chart
    const sentimentCtx = document.getElementById('sentiment-chart').getContext('2d');
    new Chart(sentimentCtx, {
        type: 'pie',
        data: {
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
                data: [60, 30, 10],
                backgroundColor: [
                    '#48bb78',
                    '#ed8936',
                    '#f56565'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
    
    // Translation status chart
    const statusCtx = document.getElementById('status-chart').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'In Progress', 'Completed'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: [
                    '#f6ad55',
                    '#4299e1',
                    '#48bb78'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Trend analysis chart
    const trendCtx = document.getElementById('trend-chart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Translation Success Rate',
                data: [65, 68, 72, 75, 78, 82],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Update charts with real data
function updateCharts() {
    // This would update charts with real data from the CSV files
    // For now, we'll keep the sample data
}

// Update personas
function updatePersonas() {
    const personasContainer = document.getElementById('personas-container');
    const personas = [
        {
            name: 'Literary Enthusiast',
            description: 'Prefers character-driven narratives',
            icon: '📚'
        },
        {
            name: 'Professional Reader',
            description: 'Values plot complexity and themes',
            icon: '💼'
        },
        {
            name: 'Casual Reader',
            description: 'Enjoys accessible, engaging stories',
            icon: '☕'
        },
        {
            name: 'Academic Reader',
            description: 'Seeks intellectual depth and cultural insights',
            icon: '🎓'
        }
    ];
    
    personasContainer.innerHTML = personas.map(persona => `
        <div class="persona">
            <div class="persona-avatar">${persona.icon}</div>
            <div class="persona-info">
                <h5>${persona.name}</h5>
                <p>${persona.description}</p>
            </div>
        </div>
    `).join('');
}

// Update translation status counts
function updateStatusCounts() {
    document.getElementById('pending-count').textContent = '70';
    document.getElementById('in-progress-count').textContent = '20';
    document.getElementById('completed-count').textContent = '10';
}

// Setup event listeners
function setupEventListeners() {
    // Add any additional event listeners here
    updateStatusCounts();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load sample data for fallback
function loadSampleData() {
    koreanBooks = [
        {
            제목: '채식주의자',
            저자: '한강',
            출판사: '창비',
            발행년도: '2007',
            ISBN: '9788936433598',
            salespoint: '150',
            description_cleaned_en: 'A powerful novel about a woman who decides to become a vegetarian',
            similarity_score: 0.85,
            market_potential: 92,
            translation_priority: 0.89
        },
        {
            제목: '82년생 김지영',
            저자: '조남주',
            출판사: '민음사',
            발행년도: '2016',
            ISBN: '9788937473135',
            salespoint: '200',
            description_cleaned_en: 'A novel about the life of a Korean woman born in 1982',
            similarity_score: 0.78,
            market_potential: 88,
            translation_priority: 0.83
        }
    ];
    
    processData();
    updateRankingTable();
    updateBigNumbers();
}

// Export functionality
function exportData() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Title,Author,Publisher,Similarity Score,Market Potential,Translation Priority\n"
        + filteredBooks.map(book => 
            `${book.제목},${book.저자},${book.출판사},${(book.similarity_score * 100).toFixed(1)}%,${book.market_potential.toFixed(1)}%,${(book.translation_priority * 100).toFixed(1)}%`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "translation_priority_ranking.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Data exported successfully!', 'success');
}

// Add export button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add export button if it doesn't exist
    if (!document.getElementById('export-btn')) {
        const rankingSection = document.querySelector('.ranking-section');
        const header = rankingSection.querySelector('h3');
        const exportBtn = document.createElement('button');
        exportBtn.id = 'export-btn';
        exportBtn.className = 'filter-btn';
        exportBtn.textContent = 'Export Data';
        exportBtn.style.marginLeft = '10px';
        exportBtn.addEventListener('click', exportData);
        
        header.appendChild(exportBtn);
    }
}); 