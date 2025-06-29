# K-Literature Translation Intelligence Platform

A comprehensive dashboard for analyzing Korean literature translation potential in the US market, built with real data integration and modern web technologies.

## 🎯 Overview

This platform provides data-driven insights for publishers, translators, and literary agents to identify high-potential Korean books for translation and publication in the US market. The dashboard combines multiple data sources to create a comprehensive analysis of translation success probability.

## 🏗️ Architecture

### Three-Column Layout Design

The dashboard uses a modern three-column grid layout for optimal information organization:

- **Left Column (250px)**: Navigation and filtering controls
- **Center Column (Flexible)**: Main data visualization and analysis
- **Right Column (300px)**: Detailed views and performance metrics

### Responsive Design

- Desktop: Full three-column layout
- Tablet: Adaptive two-column layout
- Mobile: Single-column stacked layout

## 📊 Features

### 1. Real Data Integration
- **Korean Books Database**: Comprehensive catalog of Korean literature
- **NYT Bestsellers Analysis**: US market success patterns
- **Translation Similarity Data**: AI-powered similarity scoring
- **Market Performance Metrics**: Sales and popularity indicators

### 2. Key Metrics Dashboard
- **Total Books**: Complete catalog count
- **Average Similarity**: Mean similarity to successful US books
- **Translation Score**: Composite success probability
- **Market Potential**: Estimated US market appeal

### 3. Translation Priority Ranking
- Real-time sorting by multiple criteria
- Interactive table with clickable rows
- Export functionality for data analysis
- Filtering by genre, similarity range, and publication year

### 4. Interactive Prediction Tool
- Book title input with autocomplete
- Real-time success probability calculation
- Animated book page flipping effect
- Factor breakdown (Market Similarity, Reader Appeal, Genre Demand)

### 5. US Market Analysis
- **Genre Distribution**: Visual breakdown of book categories
- **Bestseller Similarity**: Comparison with NYT bestsellers
- **Market Trends**: Historical success patterns

### 6. US Reader Analysis
- **Reader Personas**: Detailed audience profiles
- **Sentiment Analysis**: Reader response patterns
- **Demographic Insights**: Target audience characteristics

### 7. Advanced Filtering System
- Genre-based filtering
- Similarity score range selection
- Publication year filtering
- Real-time filter application

### 8. Detailed Book Information
- Complete book metadata
- Similarity score breakdown
- Market potential analysis
- Description and context

### 9. Translation Status Tracking
- Pending translations
- In-progress projects
- Completed translations
- Success rate trends

## 🛠️ Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality and data processing
- **Chart.js**: Data visualization and analytics
- **Plotly.js**: Advanced charting capabilities

### Data Processing
- **CSV Integration**: Real-time data loading from multiple sources
- **Data Merging**: Intelligent combination of disparate datasets
- **Similarity Scoring**: AI-powered book matching algorithms
- **Market Analysis**: Statistical analysis of US market trends

### Performance Features
- **Lazy Loading**: Efficient data loading and rendering
- **Responsive Design**: Optimized for all device sizes
- **Real-time Updates**: Dynamic data refresh capabilities
- **Export Functionality**: CSV export for external analysis

## 📁 Data Sources

### Primary Datasets
1. **Korean Books Database** (`book_korean(FINAL).csv`)
   - Book titles, authors, publishers
   - Publication dates and ISBNs
   - Sales performance metrics
   - English descriptions

2. **NYT Bestsellers Analysis** (`nyt_bestsellers_0618 (2).csv`)
   - US market success patterns
   - Genre distribution data
   - Reader preference analysis

3. **Translation Similarity Data** (`trans_imdb_2.csv`)
   - AI-generated similarity scores
   - Top similar book matches
   - Market compatibility metrics

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for data loading
- Local web server (for CSV file access)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/k-lit123/k-lit123.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd k-lit123.github.io
   ```

3. Start a local web server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Data Setup
Ensure the following CSV files are in the parent directory:
- `book_korean(FINAL).csv`
- `nyt_bestsellers_0618 (2).csv`
- `trans_imdb_2.csv`

## 📈 Usage Guide

### Navigation
- **Left Panel**: Use category filters to narrow down book selections
- **Center Panel**: View rankings, predictions, and market analysis
- **Right Panel**: Access detailed book information and status tracking

### Filtering
1. Select genre categories from the left navigation
2. Adjust similarity score ranges using the sliders
3. Set publication year ranges for temporal filtering
4. Click "Apply Filters" to update results

### Prediction Tool
1. Enter a book title in the prediction input
2. Click "Predict Success" or press Enter
3. View the animated prediction results
4. Analyze the factor breakdown for insights

### Data Export
1. Apply desired filters to narrow results
2. Click "Export Data" button in the ranking section
3. Download CSV file for external analysis

## 🎨 Design Features

### Visual Design
- **Modern Aesthetic**: Clean, professional interface
- **Color Scheme**: Purple gradient theme with high contrast
- **Typography**: Readable fonts with proper hierarchy
- **Animations**: Smooth transitions and micro-interactions

### User Experience
- **Intuitive Navigation**: Clear information architecture
- **Responsive Feedback**: Visual confirmation of user actions
- **Loading States**: Progress indicators for data operations
- **Error Handling**: Graceful fallbacks for data loading issues

## 🔧 Customization

### Styling
- Modify `styles.css` for visual customization
- Adjust color schemes and typography
- Customize animations and transitions

### Functionality
- Extend `script.js` for additional features
- Add new data sources and processing logic
- Implement custom visualization components

### Data Integration
- Add new CSV data sources
- Modify data processing algorithms
- Implement additional analysis metrics

## 📊 Analytics and Insights

### Key Metrics
- **Translation Success Rate**: Historical performance tracking
- **Market Trend Analysis**: Year-over-year success patterns
- **Genre Performance**: Category-specific success rates
- **Reader Sentiment**: Audience response analysis

### Predictive Analytics
- **Success Probability**: AI-powered translation success prediction
- **Market Compatibility**: US market fit assessment
- **Reader Appeal**: Target audience matching
- **Genre Demand**: Market demand forecasting

## 🤝 Contributing

### Development Guidelines
1. Follow existing code structure and naming conventions
2. Test changes across different screen sizes
3. Ensure data loading performance is maintained
4. Update documentation for new features

### Data Contributions
- Submit new Korean book data in CSV format
- Provide updated market analysis data
- Share translation success case studies

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions, suggestions, or technical support:
- Create an issue in the GitHub repository
- Contact the development team
- Review the documentation for common solutions

## 🔮 Future Enhancements

### Planned Features
- **Machine Learning Integration**: Advanced prediction algorithms
- **Real-time Data Updates**: Live market data integration
- **Collaborative Features**: Multi-user annotation and notes
- **API Integration**: External data source connections
- **Mobile App**: Native mobile application development

### Data Expansion
- **Additional Markets**: European and Asian market analysis
- **Reader Reviews**: Integration with review platforms
- **Sales Data**: Real-time sales performance tracking
- **Social Media**: Social media sentiment analysis

---

**Built with ❤️ for the Korean literature translation community** 