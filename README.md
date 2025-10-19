# AURA - Intelligent Financial Assistant

A modern, futuristic React web application for AI-powered financial management and investment analysis.

## 🚀 Features

### Frontend
- **Landing Page**: Modern hero section with glassmorphism design
- **Dashboard**: Real-time portfolio overview with AI insights
- **Market Analysis**: AI-powered market opportunities and risk assessment
- **What-If Simulator**: Interactive investment scenario modeling
- **Buy/Sell Investments**: Trade stocks, crypto, real estate, startups, and companies
- **Expert Network**: Connect with verified financial mentors
- **Security Center**: 2FA, intrusion detection, and blockchain verification
- **Profile Management**: Manage assets and risk preferences

### ✨ NEW: AI Intelligence Agents
- **Web Intelligence Agent**: Scrapes financial websites and analyzes content with Gemini AI
- **Scoring Agent**: Filters and scores results based on user profile
- **Personalized News**: Get news tailored to your interests
- **Investment Opportunities**: Discover opportunities matching your profile
- **Threat Detection**: Identify risks and market threats
- **Real-time Analysis**: 30-60 second analysis of multiple sources

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend (NEW)
- **Flask** - Python web framework
- **Google Gemini AI** - Content analysis
- **crawl4ai** - Web scraping
- **BeautifulSoup4** - HTML parsing
- **Flask-CORS** - Cross-origin resource sharing

## 📦 Installation

### Quick Start (Frontend + Backend)

**See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.**

### Frontend Only
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to Backend directory
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Create .env file with your Gemini API key
echo GEMINI_API_KEY=your_api_key_here > .env

# Start Flask server
python app.py
```

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (Backend/.env)**
```env
GEMINI_API_KEY=your_gemini_api_key
FLASK_ENV=development
FLASK_DEBUG=True
```

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-effect cards and panels
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Charts**: Real-time data visualization with Recharts

## 📁 Project Structure

```
aura-financial-assistant/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Card.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Input.jsx
│   │   │   └── RiskMeter.jsx
│   │   └── layouts/         # Layout components
│   │       ├── DashboardLayout.jsx
│   │       ├── Sidebar.jsx
│   │       ├── Header.jsx
│   │       └── NotificationPanel.jsx
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MarketAnalysis.jsx
│   │   ├── Simulator.jsx
│   │   ├── Network.jsx
│   │   ├── Security.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Key Pages

### Landing Page
- Hero section with gradient background
- Feature showcase
- Testimonials
- Call-to-action sections

### Dashboard
- Portfolio overview chart
- Risk assessment meter
- AI market opportunities
- Recent activity feed

### Market Analysis
- Asset search and filtering
- Real-time market trends
- AI-powered insights
- Risk and potential ratings

### What-If Simulator
- Investment scenario modeling
- Multiple projection scenarios
- Interactive charts
- AI analysis and recommendations

### Expert Network
- AI-powered expert matching
- Trust score ratings
- Specialty filtering
- Direct contact options

### Security Center
- 2FA management
- Login activity monitoring
- Security alerts
- Blockchain verification logs

### Profile
- Personal information management
- Asset portfolio
- Risk preference settings
- Financial summary

## 🎨 Color Palette

- **Primary**: Blue (#3b82f6)
- **Secondary**: Violet (#8b5cf6)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#ef4444)

## 🔧 Configuration

### Tailwind CSS
Custom configuration with glassmorphism utilities and extended color palette.

### Vite
Optimized for fast development with path aliases configured.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

The app is ready to be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

```bash
npm run build
# Deploy the 'dist' folder
```

## 🔐 Security Features

- Two-factor authentication UI
- Secure login/signup flows
- Session management
- Blockchain verification tracking

## 📊 Data Visualization

All charts are built with Recharts and include:
- Line charts for trends
- Area charts for portfolio growth
- Interactive tooltips
- Responsive design

## 🎭 Animations

Powered by Framer Motion:
- Page transitions
- Card hover effects
- Staggered list animations
- Smooth state changes

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤖 Using the AI Intelligence Agents

### Quick Usage

1. **Start the Backend**
   ```bash
   cd Backend
   start.bat  # Windows
   ./start.sh  # Linux/Mac
   ```

2. **Start the Frontend**
   ```bash
   npm run dev
   ```

3. **Navigate to Dashboard**
   - Open `http://localhost:5173/app`
   - Scroll to the "AI Intelligence Agent" panel
   - Click "Run Analysis"
   - Wait 30-60 seconds
   - View personalized results

### In Your Code

```javascript
import { usePersonalizedContent } from '@/hooks/useIntelligence'

function MyComponent() {
  const { content, loading, fetchContent } = usePersonalizedContent(true)
  
  return (
    <div>
      <h2>News: {content.news.length}</h2>
      <h2>Opportunities: {content.opportunities.length}</h2>
      <h2>Threats: {content.threats.length}</h2>
    </div>
  )
}
```

**See [INTEGRATION_EXAMPLES.md](INTEGRATION_EXAMPLES.md) for more examples.**

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Quick setup guide
- **[INTEGRATION_EXAMPLES.md](INTEGRATION_EXAMPLES.md)** - Code examples
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture
- **[Backend/README.md](Backend/README.md)** - Backend API documentation

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs.

## 📞 Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ using React, TailwindCSS, Flask, and AI technologies.
