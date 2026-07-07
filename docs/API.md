# RytFoods API Documentation

## Base URL
```
Development: http://localhost:3000/api/v1
Production: https://api.rytfoods.com/api/v1
```

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## Auth Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "userType": "customer" | "vendor"
}

Response: 201
{
  "success": true,
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "...",
    "user": { ... }
  }
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Refresh Token
```
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "..."
}

Response: 200
{
  "success": true,
  "data": {
    "token": "...",
    "refreshToken": "..."
  }
}
```

### Forgot Password
```
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response: 200
{
  "success": true,
  "message": "Reset link sent to email"
}
```

### Reset Password
```
POST /auth/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123"
}

Response: 200
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## Restaurant Endpoints

### List Restaurants
```
GET /restaurants?page=1&limit=20&city=New York&cuisineType=Italian

Response: 200
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Pizza Palace",
      "rating": 4.5,
      "deliveryTime": 30,
      "deliveryFee": 2.99,
      "minOrder": 15,
      "image": "https://...",
      "cuisineType": ["Italian", "Pizza"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Get Restaurant Detail
```
GET /restaurants/:restaurantId

Response: 200
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Pizza Palace",
    "description": "...",
    "rating": 4.5,
    "reviewCount": 250,
    "image": "https://...",
    "address": { ... },
    "operatingHours": { ... },
    "deliveryTime": 30,
    "deliveryFee": 2.99,
    "minOrder": 15,
    "phone": "+1234567890",
    "website": "https://..."
  }
}
```

### Search Restaurants
```
GET /restaurants/search?q=pizza&city=New York

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

### Create Restaurant (Vendor)
```
POST /restaurants
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Pizza Palace",
  "description": "...",
  "cuisineType": ["Italian", "Pizza"],
  "address": { ... },
  "operatingHours": { ... },
  "deliveryTime": 30,
  "deliveryFee": 2.99,
  "minOrder": 15,
  "phone": "+1234567890"
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

### Update Restaurant
```
PUT /restaurants/:restaurantId
Authorization: Bearer <token>
Content-Type: application/json

{ ... fields to update ... }

Response: 200
{
  "success": true,
  "data": { ... }
}
```

---

## Menu Item Endpoints

### List Menu Items
```
GET /restaurants/:restaurantId/menu?category=appetizers&page=1

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

### Get Menu Item
```
GET /menu/:menuItemId

Response: 200
{
  "success": true,
  "data": { ... }
}
```

### Create Menu Item (Vendor)
```
POST /restaurants/:restaurantId/menu
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Margherita Pizza",
  "description": "...",
  "price": 12.99,
  "category": "pizzas",
  "image": <file>,
  "isVegetarian": true,
  "preparationTime": 20
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

### Update Menu Item
```
PUT /menu/:menuItemId
Authorization: Bearer <token>
Content-Type: application/json

{ ... fields to update ... }

Response: 200
{
  "success": true,
  "data": { ... }
}
```

### Delete Menu Item
```
DELETE /menu/:menuItemId
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Menu item deleted"
}
```

---

## Cart Endpoints

### Add to Cart
```
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "restaurantId": "507f1f77bcf86cd799439011",
  "menuItemId": "507f1f77bcf86cd799439012",
  "quantity": 2,
  "specialInstructions": "No onions"
}

Response: 200
{
  "success": true,
  "data": { ... cart ... }
}
```

### Update Cart Item
```
PUT /cart/:cartItemId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}

Response: 200
{
  "success": true,
  "data": { ... }
}
```

### Remove from Cart
```
DELETE /cart/:cartItemId
Authorization: Bearer <token>

Response: 200
{
  "success": true
}
```

### Get Cart
```
GET /cart
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "items": [ ... ],
    "subtotal": 50.00,
    "tax": 5.00,
    "deliveryFee": 2.99,
    "total": 57.99
  }
}
```

---

## Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "restaurantId": "507f1f77bcf86cd799439011",
  "items": [ { "menuItemId": "...", "quantity": 2 } ],
  "deliveryAddress": { ... },
  "paymentMethod": "card",
  "specialInstructions": "Ring doorbell twice"
}

Response: 201
{
  "success": true,
  "data": {
    "orderId": "507f1f77bcf86cd799439013",
    "orderNumber": "RYT-001234",
    "totalAmount": 57.99,
    "status": "pending"
  }
}
```

### Get Order Detail
```
GET /orders/:orderId
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": { ... }
}
```

### List User Orders
```
GET /orders?page=1&status=delivered
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

### Update Order Status (Vendor)
```
PUT /orders/:orderId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "preparing" | "ready" | "out_for_delivery" | "delivered"
}

Response: 200
{
  "success": true,
  "data": { ... }
}
```

### Cancel Order
```
POST /orders/:orderId/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Changed my mind"
}

Response: 200
{
  "success": true,
  "message": "Order cancelled successfully"
}
```

### Track Order
```
GET /orders/:orderId/track
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "orderId": "...",
    "status": "out_for_delivery",
    "currentLocation": {
      "latitude": 40.7128,
      "longitude": -74.0060,
      "timestamp": "2024-01-15T10:30:00Z"
    },
    "estimatedDeliveryTime": "2024-01-15T10:45:00Z"
  }
}
```

---

## Payment Endpoints

### Create Payment Intent
```
POST /payments/create-intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "507f1f77bcf86cd799439013",
  "amount": 57.99
}

Response: 200
{
  "success": true,
  "data": {
    "clientSecret": "pi_1234567890_secret_1234567890"
  }
}
```

### Confirm Payment
```
POST /payments/confirm
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentIntentId": "pi_1234567890",
  "orderId": "507f1f77bcf86cd799439013"
}

Response: 200
{
  "success": true,
  "data": {
    "paymentId": "...",
    "status": "completed"
  }
}
```

### Get Payment History
```
GET /payments?page=1
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

---

## Review Endpoints

### Create Review
```
POST /reviews
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "restaurantId": "507f1f77bcf86cd799439011",
  "orderId": "507f1f77bcf86cd799439013",
  "rating": 4,
  "title": "Great food!",
  "content": "...",
  "images": [ <file1>, <file2> ]
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

### Get Restaurant Reviews
```
GET /restaurants/:restaurantId/reviews?page=1&sort=helpful

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

---

## Chat Endpoints

### Send Message
```
POST /chats/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "conversationId": "507f1f77bcf86cd799439014",
  "content": "When will my order arrive?"
}

Response: 200
{
  "success": true,
  "data": { ... }
}
```

### Get Conversation
```
GET /chats/:conversationId?page=1
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "messages": [ ... ],
    "pagination": { ... }
  }
}
```

### List Conversations
```
GET /chats
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

---

## User Endpoints

### Get Profile
```
GET /users/profile
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": { ... }
}
```

### Update Profile
```
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+1234567890",
  "address": { ... }
}

Response: 200
{
  "success": true,
  "data": { ... }
}
```

### Add Favorite
```
POST /users/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "restaurantId": "507f1f77bcf86cd799439011"
}

Response: 201
{
  "success": true
}
```

### Get Favorites
```
GET /users/favorites
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

---

## Admin Endpoints

### Get Dashboard Analytics
```
GET /admin/analytics?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "totalOrders": 5000,
    "totalRevenue": 125000,
    "totalUsers": 3000,
    "newUsers": 250,
    "activeRestaurants": 150,
    "cancellationRate": 5.2,
    "averageOrderValue": 25.00
  }
}
```

### Approve Restaurant
```
POST /admin/restaurants/:restaurantId/approve
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Restaurant approved"
}
```

### Reject Restaurant
```
POST /admin/restaurants/:restaurantId/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Incomplete documentation"
}

Response: 200
{
  "success": true,
  "message": "Restaurant rejected"
}
```

---

## Error Responses

### Bad Request (400)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "fields": {
      "email": "Email is required"
    }
  }
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Restaurant not found"
  }
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": {
    "code": "SERVER_ERROR",
    "message": "Internal server error"
  }
}
```

---

## Rate Limiting

- **General API**: 100 requests per minute per IP
- **Auth Endpoints**: 5 requests per minute per IP
- **Payment Endpoints**: 10 requests per minute per user

Rate limit headers included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642345678
```
