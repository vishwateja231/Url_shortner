# 🚀 URL Shortener - CRUD Application

A modern, full-stack URL shortening application built with React, Node.js, Express, and MongoDB. Features a clean, responsive design with complete CRUD operations.

## ✨ Features

- **Create**: Generate short URLs with optional titles and descriptions
- **Read**: View all your shortened URLs with detailed information
- **Update**: Edit existing URLs, titles, and descriptions
- **Delete**: Remove URLs you no longer need
- **Modern UI**: Clean, responsive design with smooth animations
- **Real-time Updates**: Instant feedback with on-screen notifications
- **Click Tracking**: Monitor how many times each URL is accessed
- **MongoDB Integration**: Persistent data storage with MongoDB

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Modern design system with gradients and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB running locally or MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd URL-Shortener-main
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the `server` directory:
   ```env
   DATABASE_URL=mongodb://localhost:27017/url_shortener
   BASE_URL=http://localhost:5000
   ```
   
   Create `.env` file in the `client` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Start MongoDB**
   - Local MongoDB: Ensure MongoDB service is running
   - MongoDB Atlas: Use your connection string

6. **Run the application**
   
   **Terminal 1 - Start Backend:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Start Frontend:**
   ```bash
   cd client
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
URL-Shortener-main/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Main.jsx
│   │   │   ├── Shortener.jsx
│   │   │   └── Notification.jsx
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/       # Business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── utils/            # Utility functions
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Create a new short URL |
| `GET` | `/all` | Get all URLs |
| `GET` | `/url/:id` | Get URL by ID |
| `PUT` | `/url/:id` | Update URL by ID |
| `DELETE` | `/url/:id` | Delete URL by ID |
| `GET` | `/:shortUrlId` | Redirect to original URL |

## 🎨 UI Components

- **Header**: Clean logo without navigation clutter
- **Hero**: Simple, focused messaging
- **Shortener Form**: Comprehensive CRUD interface
- **URL List**: Card-based display with edit/delete actions
- **Notifications**: On-screen success/error messages
- **Statistics**: Performance tracking information

## 🔧 Customization

### Styling
- Modify `client/src/index.css` for design changes
- Update color schemes, fonts, and animations
- Customize component layouts and spacing

### Functionality
- Add new fields to the URL model in `server/models/Url.js`
- Extend API endpoints in `server/controllers/url.js`
- Modify form validation and business logic

## 🚀 Deployment

### Frontend (React)
- Build: `npm run build`
- Deploy to Vercel, Netlify, or any static hosting

### Backend (Node.js)
- Deploy to Heroku, Railway, or any Node.js hosting
- Update environment variables for production
- Ensure MongoDB connection string is secure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web technologies
- Clean, accessible UI design
- Comprehensive CRUD functionality
- MongoDB integration for data persistence
