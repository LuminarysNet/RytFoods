# RytFoods Backend Setup

## Prerequisites
- Node.js 16+
- MongoDB Atlas or local MongoDB
- Redis (optional, for caching)
- Stripe Account
- Firebase Project
- Google Maps API Key

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/LuminarysNet/RytFoods.git
cd RytFoods/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- MongoDB URI
- JWT Secret
- Stripe Keys
- Firebase Config
- Google Maps API Key
- Email Configuration

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## Project Structure

```
backend/
├── src/
│   ├── models/           # Database schemas
│   ├── controllers/      # Request handlers
│   ├── routes/          # API endpoints
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic
│   ├── utils/           # Utilities
│   └── server.js        # Entry point
├── logs/                # Application logs
├── .env.example         # Environment template
├── package.json
└── Dockerfile
```

## API Documentation

See `docs/API.md` for complete API documentation

## Testing

```bash
npm test
```

## Deployment

### Docker
```bash
docker build -t rytfoods-backend .
docker run -p 3000:3000 --env-file .env rytfoods-backend
```

### Heroku
```bash
heroku create rytfoods-api
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

## Features

- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ Rate Limiting
- ✅ Input Validation
- ✅ Error Handling
- ✅ Logging
- ✅ CORS Support
- ✅ Security Headers
- ✅ Request Sanitization

## Environment Variables

All required environment variables are listed in `.env.example`

## Support

For issues and questions, open an issue on GitHub.
