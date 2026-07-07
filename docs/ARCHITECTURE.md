# RytFoods Architecture

## System Overview

RytFoods is a three-tier architecture consisting of:
1. **Frontend Tier** - React Native Mobile App + React Admin Dashboard
2. **Backend Tier** - Node.js/Express API
3. **Data Tier** - MongoDB Database

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐       ┌──────────────────────┐        │
│  │  Mobile App      │       │  Admin Dashboard     │        │
│  │  (React Native)  │       │  (React)             │        │
│  └────────┬─────────┘       └────────┬─────────────┘        │
│           │                          │                      │
└───────────┼──────────────────────────┼──────────────────────┘
            │ HTTP/WebSocket          │ HTTP/WebSocket
            │                          │
┌───────────┼──────────────────────────┼──────────────────────┐
│           ▼                          ▼                       │
│    ┌─────────────────────────────────────────┐             │
│    │     API GATEWAY / LOAD BALANCER         │             │
│    │  (Express.js with rate limiting)        │             │
│    └──────────────────┬──────────────────────┘             │
│                       │                                     │
│         ┌─────────────┴─────────────┐                       │
│         │                           │                       │
│    APPLICATION LAYER (Microservices)                        │
│         │                           │                       │
│    ┌────▼────────────┐     ┌───────▼────────┐             │
│    │  Auth Service   │     │ Order Service  │             │
│    ├─────────────────┤     ├────────────────┤             │
│    │ • Login/Signup  │     │ • Order CRUD   │             │
│    │ • JWT Tokens    │     │ • Order Track  │             │
│    │ • Verification  │     │ • Status Mgmt  │             │
│    └────────────────┘     └────────────────┘             │
│                                                             │
│    ┌──────────────────┐     ┌──────────────────┐         │
│    │ Restaurant Svc   │     │ Payment Service  │         │
│    ├──────────────────┤     ├──────────────────┤         │
│    │ • Menu Mgmt      │     │ • Stripe API     │         │
│    │ • Search/Filter  │     │ • Transactions   │         │
│    │ • Details        │     │ • Invoicing      │         │
│    └──────────────────┘     └──────────────────┘         │
│                                                             │
│    ┌──────────────────┐     ┌──────────────────┐         │
│    │ Chat Service     │     │ AI Service       │         │
│    ├──────────────────┤     ├──────────────────┤         │
│    │ • Real-time      │     │ • Recommendations│         │
│    │ • Socket.io      │     │ • Smart Search   │         │
│    │ • Notifications  │     │ • Analytics      │         │
│    └──────────────────┘     └──────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
            │
            │ (Query/Update)
            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐       ┌──────────────────────┐       │
│  │  MongoDB         │       │  Redis Cache         │       │
│  │  (Main DB)       │       │  (Sessions/Cache)    │       │
│  └──────────────────┘       └──────────────────────┘       │
│                                                               │
│  ┌──────────────────┐       ┌──────────────────────┐       │
│  │  Firebase        │       │  Cloud Storage       │       │
│  │  (Auth/Messaging)│       │  (Images/Files)      │       │
│  └──────────────────┘       └──────────────────────┘       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  userType: Enum ['customer', 'vendor', 'admin'],
  profileImage: String (URL),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: { latitude, longitude }
  },
  firebaseUID: String,
  isVerified: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Restaurant Model
```javascript
{
  _id: ObjectId,
  vendorId: ObjectId (reference to User),
  name: String,
  description: String,
  cuisineType: [String],
  rating: Number (0-5),
  image: String (URL),
  address: {
    street: String,
    city: String,
    coordinates: { latitude, longitude }
  },
  operatingHours: {
    monday: { open: String, close: String },
    // ... other days
  },
  isOpen: Boolean,
  deliveryTime: Number (minutes),
  deliveryFee: Number,
  minOrder: Number,
  phone: String,
  isApproved: Boolean,
  isVerified: Boolean,
  totalOrders: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### MenuItem Model
```javascript
{
  _id: ObjectId,
  restaurantId: ObjectId (reference to Restaurant),
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  category: String,
  isVegetarian: Boolean,
  isVegan: Boolean,
  isSpicy: Boolean,
  calories: Number,
  preparationTime: Number (minutes),
  availability: Boolean,
  ratings: Number (0-5),
  totalReviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  customerId: ObjectId (reference to User),
  restaurantId: ObjectId (reference to Restaurant),
  items: [
    {
      menuItemId: ObjectId,
      quantity: Number,
      price: Number,
      specialInstructions: String
    }
  ],
  subtotal: Number,
  tax: Number,
  deliveryFee: Number,
  totalAmount: Number,
  orderStatus: Enum ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
  deliveryAddress: Object,
  paymentMethod: String,
  paymentStatus: Enum ['pending', 'completed', 'failed', 'refunded'],
  paymentId: String (Stripe),
  estimatedDeliveryTime: Date,
  deliveryPartner: ObjectId (reference to User),
  trackingLocation: { latitude, longitude },
  specialInstructions: String,
  ratingGiven: Boolean,
  rating: Number,
  review: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Model
```javascript
{
  _id: ObjectId,
  conversationId: String (unique),
  participants: [ObjectId, ObjectId],
  messages: [
    {
      senderId: ObjectId,
      content: String,
      timestamp: Date,
      isRead: Boolean
    }
  ],
  orderId: ObjectId (reference to Order),
  lastMessage: String,
  lastMessageTime: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Layer Architecture

### Request Flow
```
Client Request
    ↓
API Gateway (Rate Limiting, CORS)
    ↓
Authentication Middleware (JWT Validation)
    ↓
Authorization Middleware (Role Checking)
    ↓
Validation Middleware (Input Validation)
    ↓
Controller (Business Logic)
    ↓
Service Layer (Database Queries, External APIs)
    ↓
Database
    ↓
Response
```

### Middleware Stack
```javascript
// app.js
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(errorHandler);
app.use(authMiddleware);
app.use(validationMiddleware);
```

---

## Authentication Flow

### JWT-based Authentication
```
1. User enters credentials
2. Backend validates against database
3. JWT token generated (Access + Refresh)
4. Token stored on client (AsyncStorage for mobile)
5. Token sent in Authorization header for subsequent requests
6. Backend validates JWT on each request
7. Token refresh when expired
```

### Firebase Social Login
```
1. User clicks "Sign in with Google/Apple"
2. Firebase SDK handles OAuth flow
3. Firebase returns ID token
4. Backend verifies token with Firebase
5. User record created/retrieved
6. JWT issued by backend
```

---

## Real-time Communication (Socket.io)

### Chat Events
```javascript
// Client → Server
socket.emit('send_message', { conversationId, message })
socket.emit('typing', { conversationId })
socket.emit('mark_read', { conversationId })

// Server → Client
socket.on('receive_message', (message) => {})
socket.on('user_typing', (data) => {})
socket.on('message_read', (data) => {})
```

### Order Status Events
```javascript
// Server → Client (Customer & Vendor)
socket.emit('order_status_updated', { orderId, status })
socket.emit('order_assigned', { orderId, partner })
socket.emit('delivery_started', { orderId, location })
```

---

## Payment Processing

### Stripe Integration Flow
```
1. Customer adds items to cart
2. Frontend creates Payment Intent
3. Stripe returns client secret
4. Customer enters card details
5. Frontend confirms payment
6. Stripe processes payment
7. Backend receives webhook confirmation
8. Order created with payment_completed status
9. Notification sent to vendor & customer
```

---

## Caching Strategy

### Redis Cache
```
Key: restaurant:{restaurantId}
Value: Restaurant data
TTL: 1 hour

Key: menu:{restaurantId}
Value: Menu items
TTL: 30 minutes

Key: user:{userId}
Value: User session
TTL: Until logout
```

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email is required",
    "statusCode": 400
  }
}
```

---

## Security Measures

1. **JWT Tokens** - Secure authentication
2. **HTTPS** - Encrypted communication
3. **Rate Limiting** - DDoS protection
4. **Input Validation** - SQL/NoSQL injection prevention
5. **Password Hashing** - bcrypt with salt rounds
6. **CORS** - Cross-origin request control
7. **Environment Variables** - Sensitive data protection
8. **Firebase Security Rules** - Database access control

---

## Scalability Considerations

1. **Horizontal Scaling** - Multiple backend instances
2. **Load Balancing** - Nginx/HAProxy
3. **Database Sharding** - By geography or user ID
4. **Caching Layer** - Redis for frequently accessed data
5. **CDN** - CloudFlare for static assets
6. **Message Queue** - RabbitMQ/Kafka for async operations
7. **Microservices** - Separate services for each domain

---

## Performance Optimization

1. **Database Indexing** - Frequently queried fields
2. **Query Optimization** - Lean queries, aggregation pipeline
3. **Image Optimization** - Compression, WebP format
4. **Code Splitting** - Mobile app chunks
5. **Lazy Loading** - Load screens on demand
6. **API Response Caching** - Client-side caching

---

## Monitoring & Logging

1. **Application Logging** - Winston/Morgan
2. **Performance Monitoring** - New Relic/DataDog
3. **Error Tracking** - Sentry
4. **Analytics** - Google Analytics/Mixpanel
5. **Uptime Monitoring** - UptimeRobot
