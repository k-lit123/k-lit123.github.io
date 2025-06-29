# K-Literature Translation Intelligence Platform

A comprehensive data-driven dashboard designed to help the Literature Translation Institute of Korea (한국문학번역원) and Korean publishers strategize the translation and promotion of Korean literature in the US market.

## 🌟 Overview

This platform analyzes the US book market and American reader preferences to predict the success potential of Korean books if translated into English. The primary goal is to provide data-driven insights that help users prioritize which Korean literary works to translate, thereby maximizing their chances of success with American readers.

## 🚀 Key Features

- **Interactive Prediction Tool**: Analyze specific Korean books for translation potential
- **Translation Priority Ranking**: Data-driven ranking of Korean books by success probability
- **US Market Analysis**: NYT Bestseller analysis and market trend identification
- **Reader Persona Analysis**: American reader behavior and preference insights
- **Real-time Metrics**: Key performance indicators and success rates
- **Export Functionality**: Download ranking data and analysis reports
- **Responsive Design**: Optimized for desktop dashboard usage

## 📊 Dashboard Sections

### 1. Key Metrics
- **흥행 예측 도서 / 실제 번역 비율**: Success predictions vs. actual translation rate
- **평균 Score**: Average prediction score across all analyzed books
- **성공작 평균 유사도**: Average similarity to successful translated works
- **평균 Salespoint**: Average commercial potential score
- **NYT BS 평균 유사도**: Average similarity to NYT Bestsellers

### 2. Interactive Prediction Tool
- Enter Korean book title or ISBN for instant analysis
- Real-time success probability calculation
- Detailed breakdown of prediction factors
- Animated book page flipping effects

### 3. Translation Priority Ranking
- Comprehensive table of Korean books ranked by success potential
- Sortable by multiple criteria (Success Sim, Sales Point, NYT Sim, Final Score)
- Click for detailed book information
- Export functionality for data analysis

### 4. US Market Analysis
- **Description-based Cluster**: Groups NYT Bestsellers by themes and keywords
- **Marketing Expression**: Effective marketing phrases from US bestsellers
- Interactive bubble chart visualization

### 5. US Reader Analysis
- **Reader Personas**: Typical American reader profiles
- **Sentiment-based Reader Cluster**: Reader groups based on emotional responses
- **Preferred Genre Analysis**: Genre preferences by reader segment

### 6. Sidebar Tools
- **Filters**: Sort and filter ranking data
- **Detailed View**: In-depth book information
- **Translation Status**: Performance of currently translated books
- **Trend Analysis**: Success patterns by publication year
- **Curation Tool**: Find similar books for translation

## 🎨 Design Features

- **Book-themed Design**: Modern, clean interface with literary aesthetics
- **Animated Elements**: Book page flipping animations and floating effects
- **Responsive Layout**: Optimized for desktop dashboard usage
- **Interactive Visualizations**: Bubble charts, sentiment analysis, and trend graphs
- **Smooth Transitions**: Professional animations and hover effects

## 📂 File Structure

```
k-lit123.github.io/
├── index.html          # Main dashboard HTML structure
├── styles.css          # Dashboard styling and animations
├── script.js           # Interactive functionality and data handling
├── README.md           # Project documentation
├── trans_imdb_2.csv    # Translation and IMDB data
├── trans_with_genre.csv # Translation data with genre information
├── nyt_bestsellers_0618 (2).csv # NYT Bestsellers dataset
├── book_korean(FINAL).csv # Korean books database
└── .git/               # Git repository
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for dashboard structure
- **CSS3**: Modern styling with Flexbox, Grid, and CSS animations
- **JavaScript (ES6+)**: Interactive functionality and data visualization
- **Font Awesome**: Professional icons for enhanced UX
- **Google Fonts**: Inter and Playfair Display for typography
- **Canvas API**: Custom chart rendering for trend analysis

## 📱 Navigation

### Left Sidebar Navigator
- **전체 (All)**: Display all Korean books without filters
- **K-Lit Candidates**: High-potential translation candidates
- **국내 인기도 (Domestic Popularity)**: Popular Korean books
- **NYT 유사도 (NYT Bestseller Similarity)**: Books similar to US bestsellers

### Main Content Area
- Key metrics cards with trend indicators
- Interactive prediction tool with book animations
- Comprehensive ranking table with sorting options
- Market analysis visualizations
- Reader persona and sentiment analysis

### Right Sidebar
- Advanced filtering options
- Detailed book information panel
- Translation performance metrics
- Trend analysis charts
- Book curation tools

## 🔧 Customization

### Data Integration
- Connect to the four CSV databases for real data analysis
- Implement backend API for real-time data processing
- Add user authentication and data management

### Visual Enhancements
- Add more chart types (line charts, heatmaps, etc.)
- Implement data filtering and search functionality
- Add book cover image integration

### Functionality Extensions
- User account management and preferences
- Advanced analytics and reporting
- Integration with translation management systems
- Real-time data updates and notifications

## 📈 Performance Features

- **Optimized Loading**: Efficient data handling and rendering
- **Smooth Animations**: CSS3 animations for enhanced user experience
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Elements**: Real-time updates and feedback
- **Export Capabilities**: Data export in multiple formats

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Desktop browsers optimized

## 📊 Data Sources

The platform is designed to work with four main CSV databases:
1. **trans_imdb_2.csv**: Translation and IMDB rating data
2. **trans_with_genre.csv**: Translation data with genre classifications
3. **nyt_bestsellers_0618 (2).csv**: NYT Bestsellers analysis data
4. **book_korean(FINAL).csv**: Comprehensive Korean books database

## 🚀 Deployment

### GitHub Pages
This dashboard is automatically deployed to GitHub Pages at: **https://k-lit123.github.io**

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/k-lit123/k-lit123.github.io.git
   cd k-lit123.github.io
   ```

2. Open `index.html` in your web browser to view the dashboard locally.

## 📞 Support

- **GitHub**: [k-lit123](https://github.com/k-lit123)
- **Dashboard**: [k-lit123.github.io](https://k-lit123.github.io)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for advancing Korean literature in global markets 