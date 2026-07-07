# 🍕 RytFoods - Food Delivery Application

A comprehensive, production-ready food delivery platform with native mobile apps (iOS & Android), robust backend API, real-time features, and complete admin dashboard.

## 📱 Project Overview

**App Name:** RytFoods  
**Platform:** iOS & Android (React Native)  
**Backend:** Node.js + Express + MongoDB  
**Real-time:** Socket.io  
**Authentication:** JWT + Firebase Auth  
**Payments:** Stripe Integration  
**Maps:** Google Maps  
**AI Features:** Recommendations & Chat
**Push Notifications:** Firebase Cloud Messaging

---

## 🎨 Branding Guidelines

### Color Palette
```
Primary Orange:     #FF6B35 (Main CTA, Buttons, Highlights)
Dark Charcoal:      #1A1A1A (Text, Headers, Dark Backgrounds)
Accent Green:       #2ECC71 (Success, Order Status, Confirmations)
Light Gray:         #F5F5F5 (Backgrounds, Cards, Dividers)
Warning Red:        #E74C3C (Alerts, Cancellations)
Accent Blue:        #3498DB (Information, Links)
```

### Typography
- **Primary Font:** Inter, Roboto (sans-serif)
- **Secondary Font:** Playfair Display (headings, logo)
- **Body:** 14-16px
- **Headings:** 24-32px

---

## 👥 User Types & Roles

### 1. **Customer**
- Browse restaurants and menu items
- Search and filter food
- Add items to cart
- Process payments
- Track orders in real-time
- Rate and review restaurants/food
- Chat with vendors
- View order history
- Manage favorites

### 2. **Vendor (Restaurant Owner)**
- Manage restaurant profile
- Add/edit menu items
- View incoming orders
- Update order status
- Chat with customers
- View analytics and revenue
- Manage delivery partners
- Set availability/hours

### 3. **Admin**
- System-wide analytics
- User management
- Restaurant approval/verification
- Payment management
- Commission handling
- Support ticket management
- System configuration

---

## ✨ Core Features

### Authentication & Security
- ✅ JWT-based authentication
- ✅ Firebase social login (Google, Apple)
- ✅ Email verification
- ✅ Password reset
- ✅ Role-based access control (RBAC)

### Customer Features
- ✅ Restaurant discovery & search
- ✅ Advanced filtering (cuisine, ratings, delivery time)
- ✅ Menu browsing with images
- ✅ Shopping cart with modifications
- ✅ Multiple payment methods (Card, Wallet, Cash)
- ✅ Real-time order tracking with GPS
- ✅ Order history & favorites
- ✅ Ratings & reviews
- ✅ Push notifications for order updates

### Vendor Features
- ✅ Restaurant dashboard
- ✅ Menu management (CRUD)
- ✅ Order management system
- ✅ Real-time order notifications
- ✅ Delivery partner assignment
- ✅ Analytics & revenue reports
- ✅ Customer chat support

### Technical Features
- ✅ GPS/Maps integration
- ✅ Real-time chat (Socket.io)
- ✅ Stripe payment processing
- ✅ Firebase Cloud Messaging (Push notifications)
- ✅ Image upload & optimization
- ✅ AI-powered recommendations
- ✅ Order status tracking
- ✅ Admin dashboard analytics

---

## 📁 Project Structure

```
RytFoods/
├── mobile/                          # React Native Mobile App (iOS & Android)
│   ├── ios/
│   ├── android/
│   ├── src/
│   │   ├── screens/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginScreen.js
│   │   │   │   ├── SignupScreen.js
│   │   │   │   └── ForgotPasswordScreen.js
│   │   │   ├── Customer/
│   │   │   │   ├── HomeScreen.js
│   │   │   │   ├── RestaurantDetailScreen.js
│   │   │   │   ├── CartScreen.js
│   │   │   │   ├── CheckoutScreen.js
│   │   │   │   ├── OrderTrackingScreen.js
│   │   │   │   ├── ProfileScreen.js
│   │   │   │   ├── FavoritesScreen.js
│   │   │   │   └── ChatScreen.js
│   │   │   ├── Vendor/
│   │   │   │   ├── VendorDashboard.js
│   │   │   │   ├── MenuManagementScreen.js
│   │   │   │   ├── OrderManagementScreen.js
│   │   │   │   ├── AnalyticsScreen.js
│   │   │   │   └── VendorChatScreen.js
│   │   │   └── Shared/
│   │   │       ├── SplashScreen.js
│   │   │       └── NotFoundScreen.js
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── RestaurantCard/
│   │   │   ├── MenuItem/
│   │   │   ├── CartItem/
│   │   │   ├── OrderStatusIndicator/
│   │   │   └── MapComponent/
│   │   ├── navigation/
│   │   │   ├── RootNavigator.js
│   │   │   ├── AuthNavigator.js
│   │   │   ├── CustomerNavigator.js
│   │   │   ├── VendorNavigator.js
│   │   │   └── AdminNavigator.js
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── restaurantSlice.js
│   │   │   │   ├── orderSlice.js
│   │   │   │   └── userSlice.js
│   │   │   └── thunks/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   ├── restaurant.service.js
│   │   │   ├── order.service.js
│   │   │   ├── payment.service.js
│   │   │   ├── chat.service.js
│   │   │   └── notification.service.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── validation.js
│   │   │   ├── formatters.js
│   │   │   └── storage.js
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   └── App.js
│   ├── .env.example
│   ├── package.json
│   └── app.json
├── backend/                         # Node.js/Express Backend API
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Restaurant.js
│   │   │   ├── MenuItem.js
│   │   │   ├── Order.js
│   │   │   ├── Review.js
│   │   │   ├── Chat.js
│   │   │   ├── Payment.js
│   │   │   └── Admin.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── restaurantController.js
│   │   │   ├── menuController.js
│   │   │   ├── orderController.js
│   │   │   ├── paymentController.js
│   │   │   ├── chatController.js
│   │   │   ├── reviewController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── restaurant.routes.js
│   │   │   ├── menu.routes.js
│   │   │   ├── order.routes.js
│   │   │   ├── payment.routes.js
│   │   │   ├── chat.routes.js
│   │   │   ├── review.routes.js
│   │   │   └── admin.routes.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── validation.middleware.js
│   │   │   └── rateLimit.middleware.js
│   │   ├── services/
│   │   │   ├── email.service.js
│   │   │   ├── payment.service.js
│   │   │   ├── notification.service.js
│   │   │   ├── ai.service.js
│   │   │   ├── storage.service.js
│   │   │   └── socket.service.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── firebase.js
│   │   │   ├── stripe.js
│   │   │   └── mail.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── validators.js
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
├── admin-dashboard/                 # React Admin Dashboard
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Analytics.jsx
│   │   │   │   └── Statistics.jsx
│   │   │   ├── Users/
│   │   │   │   ├── UserManagement.jsx
│   │   │   │   ├── UserDetail.jsx
│   │   │   │   └── UserForm.jsx
│   │   │   ├── Restaurants/
│   │   │   │   ├── RestaurantManagement.jsx
│   │   │   │   ├── RestaurantApproval.jsx
│   │   │   │   └── RestaurantDetail.jsx
│   │   │   ├── Orders/
│   │   │   │   ├── OrderManagement.jsx
│   │   │   │   ├── OrderDetail.jsx
│   │   │   │   └── OrderAnalytics.jsx
│   │   │   ├── Payments/
│   │   │   │   ├── PaymentManagement.jsx
│   │   │   │   └── CommissionManagement.jsx
│   │   │   ├── Support/
│   │   │   │   ├── SupportTickets.jsx
│   │   │   │   └── TicketDetail.jsx
│   │   │   ├── Settings/
│   │   │   │   ├── SystemSettings.jsx
│   │   │   │   ├── Commission.jsx
│   │   │   │   └── Notifications.jsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   └── NotFound.jsx
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── Charts/
│   │   │   │   ├── LineChart.jsx
│   │   │   │   ├── BarChart.jsx
│   │   │   │   └── PieChart.jsx
│   │   │   ├── Tables/
│   │   │   │   ├── DataTable.jsx
│   │   │   │   └── OrderTable.jsx
│   │   │   ├── Modals/
│   │   │   │   ├── ApprovalModal.jsx
│   │   │   │   └── RejectModal.jsx
│   │   │   └── Common/
│   │   │       ├── Button.jsx
│   │   │       ├── Input.jsx
│   │   │       └── Card.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   ├── user.service.js
│   │   │   ├── restaurant.service.js
│   │   │   ├── order.service.js
│   │   │   ├── payment.service.js
│   │   │   └── analytics.service.js
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── dashboardSlice.js
│   │   │   │   └── uiSlice.js
│   │   │   └── thunks/
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── variables.css
│   │   │   └── responsive.css
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── formatters.js
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   └── TESTING.md
├── docker-compose.yml
├── .gitignore
└── LICENSE
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB (local or Atlas)
- Firebase project setup
- Stripe account
- Google Maps API key

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your environment variables
npm run dev
```

### Mobile App Setup
```bash
cd mobile
npm install
cp .env.example .env

# For Android
npm run android

# For iOS
npm run ios
```

### Admin Dashboard Setup
```bash
cd admin-dashboard
npm install
cp .env.example .env
npm run dev
```

---

## 🔑 Environment Variables

Create `.env` files in each directory:

### Backend `.env`
```
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/rytfoods
JWT_SECRET=your_jwt_secret_key
FIREBASE_API_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_PUBLIC_KEY=...
GOOGLE_MAPS_API_KEY=...
FIREBASE_PROJECT_ID=...
MAIL_SERVICE=gmail
MAIL_USER=...
MAIL_PASS=...
```

### Mobile `.env`
```
API_BASE_URL=http://192.168.x.x:3000
FIREBASE_API_KEY=...
FIREBASE_PROJECT_ID=...
GOOGLE_MAPS_API_KEY=...
STRIPE_PUBLIC_KEY=...
```

### Admin Dashboard `.env`
```
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_PROJECT_ID=...
```

---

## 📚 Documentation

- [API Documentation](./docs/API.md) - RESTful API endpoints
- [Database Schema](./docs/DATABASE.md) - MongoDB collections
- [Architecture](./docs/ARCHITECTURE.md) - System design & patterns
- [Setup Guide](./docs/SETUP.md) - Installation & configuration
- [Deployment](./docs/DEPLOYMENT.md) - Production deployment
- [Testing](./docs/TESTING.md) - Testing guidelines

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Mobile tests
cd mobile
npm run test

# Admin dashboard tests
cd admin-dashboard
npm run test
```

---

## 🐳 Docker Deployment

```bash
docker-compose up -d
```

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a Pull Request

---

## 📞 Support

For issues and questions, please open an issue on GitHub or contact support@rytfoods.com
