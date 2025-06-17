# 🚀 NASA Center

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.10-purple.svg)](https://www.framer.com/motion/)
[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen.svg)](https://nasa-center.vercel.app/)

## ✨ Overview
NASA Center is a **frontend React-based web application** that integrates multiple NASA APIs to provide real-time space data. It offers users a visually immersive and interactive experience with space exploration, including **3D visualizations, live Earth streams, AI assistant powered by Gemini and NASA APIs, and educational quizzes**.

## 🌐 Demo
Experience NASA Center live: [https://nasa-center.vercel.app/](https://nasa-center.vercel.app/)

## 🚀 Features
- **Real-Time Space Data:** Fetches the latest space data from NASA APIs
- **Image Gallery & Filtering:** View and filter NASA's space images with date-based search (APOD, Mars Rover, etc.)
- **Live Earth Stream:** Watch Earth from space in real-time via official NASA feeds
- **3D Solar System Visualization:** Interactive 3D representation of the solar system using NASA's Eyes web integration
- **AI-powered Virtual Assistant:** Chatbot for space-related queries powered by Gemini Pro and NASA APIs
- **Responsive Design:** Fully responsive layout that works on mobile, tablet, and desktop devices
- **Dark Mode Support:** Enhanced accessibility and user experience with toggle between light/dark themes
- **Interactive Space Quiz:** Educational quizzes to test and expand space knowledge
- **Advanced Search:** Search functionality across NASA's vast database of space images and information
- **Space News Ticker:** Stay updated with the latest space missions and discoveries

## 🔧 Technologies

### Frontend Technologies
- **React 19** - UI Framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - API Requests
- **React Router v7** - Routing
- **React Three Fiber/Drei** - 3D Visualizations
- **Lucide React** - Icon Library

### AI Integration
- **Google Generative AI (Gemini Pro)** - Powers the AI chatbot

### APIs Used
- **NASA APIs:**
  - APOD (Astronomy Picture of the Day)
  - Mars Rover Photos
  - EPIC (Earth Polychromatic Imaging Camera)
  - NEO (Near-Earth Object)
  - NASA Live Events & News Feeds

## 💻 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/omarhany04/nasa-center.git
   cd nasa-center
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with your NASA API and Google Gemini API keys:
   ```
   REACT_APP_NASA_API_KEY=your_nasa_api_key
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```
   - Get a NASA API key at: [https://api.nasa.gov/](https://api.nasa.gov/)
   - Get a Gemini API key at: [https://ai.google.dev/](https://ai.google.dev/)

4. **Start the development server**
   ```bash
   npm start
   ```

## 🚀 Usage

After starting the development server, open [http://localhost:3000](http://localhost:3000) in your browser to explore:

- Browse the homepage to access different NASA data sections
- View the Astronomy Picture of the Day (APOD)
- Explore Mars rover photos
- Check near-Earth objects (asteroids)
- View Earth images from the EPIC camera
- Use the AI chatbot for space-related questions
- Take the interactive space quiz
- Toggle between light and dark modes
- Search for specific space content

## 🌌 NASA APIs

NASA Center leverages several NASA APIs to provide data:

- **APOD API**: Provides the Astronomy Picture of the Day
- **Mars Rover Photos API**: Access to photos from the Mars rovers (Curiosity, Opportunity, Spirit)
- **EPIC API**: Earth Polychromatic Imaging Camera images
- **NEO API**: Near-Earth Object information and tracking data

NASA provides a generous free tier for these APIs (1,000 requests per hour).

## 📂 Project Structure

```
nasa-center/
├── public/              
│   ├── data/             
│   └── textures/        
├── src/
│   ├── components/       
│   ├── pages/         
│   ├── routes/           
│   └── styles/          
└── README.md            
```

## 🔮 Future Roadmap

- Add user authentication to save favorite images and quizzes
- Implement more 3D visualizations of celestial bodies
- Create a timeline of important space events
- Add real-time ISS tracking
- Expand the AI chatbot capabilities with more space knowledge
- Integrate additional NASA APIs as they become available
- Add push notifications for major space events and launches