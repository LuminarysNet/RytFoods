# RytFoods Database Schema

## MongoDB Collections

### 1. Users Collection

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "name", "userType", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        name: { bsonType: "string" },
        email: { bsonType: "string" },
        password: { bsonType: "string" },
        phone: { bsonType: "string" },
        userType: { enum: ["customer", "vendor", "admin"] },
        profileImage: { bsonType: "string" },
        address: {
          bsonType: "object",
          properties: {
            street: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            zipCode: { bsonType: "string" },
            country: { bsonType: "string" },
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" }
          }
        },
        firebaseUID: { bsonType: "string" },
        isVerified: { bsonType: "bool" },
        isActive: { bsonType: "bool" },
        lastLogin: { bsonType: "date" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ phone: 1 });
db.users.createIndex({ userType: 1 });
db.users.createIndex({ createdAt: -1 });
```

### 2. Restaurants Collection

```javascript
db.createCollection("restaurants", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "vendorId", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        vendorId: { bsonType: "objectId" },
        name: { bsonType: "string" },
        description: { bsonType: "string" },
        cuisineType: { bsonType: "array", items: { bsonType: "string" } },
        rating: { bsonType: "double", minimum: 0, maximum: 5 },
        reviewCount: { bsonType: "int" },
        image: { bsonType: "string" },
        bannerImage: { bsonType: "string" },
        address: {
          bsonType: "object",
          properties: {
            street: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            zipCode: { bsonType: "string" },
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" }
          }
        },
        operatingHours: {
          bsonType: "object",
          properties: {
            monday: { bsonType: "object" },
            tuesday: { bsonType: "object" },
            wednesday: { bsonType: "object" },
            thursday: { bsonType: "object" },
            friday: { bsonType: "object" },
            saturday: { bsonType: "object" },
            sunday: { bsonType: "object" }
          }
        },
        isOpen: { bsonType: "bool" },
        deliveryTime: { bsonType: "int" },
        deliveryFee: { bsonType: "double" },
        minOrder: { bsonType: "double" },
        maxOrder: { bsonType: "double" },
        phone: { bsonType: "string" },
        email: { bsonType: "string" },
        website: { bsonType: "string" },
        isApproved: { bsonType: "bool" },
        isVerified: { bsonType: "bool" },
        totalOrders: { bsonType: "int" },
        totalRevenue: { bsonType: "double" },
        commission: { bsonType: "double" },
        bankDetails: { bsonType: "object" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.restaurants.createIndex({ vendorId: 1 });
db.restaurants.createIndex({ name: "text", description: "text" });
db.restaurants.createIndex({ "address.latitude": 1, "address.longitude": 1 });
db.restaurants.createIndex({ isApproved: 1, isOpen: 1 });
db.restaurants.createIndex({ rating: -1 });
```

### 3. MenuItems Collection

```javascript
db.createCollection("menuItems", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["restaurantId", "name", "price", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        restaurantId: { bsonType: "objectId" },
        name: { bsonType: "string" },
        description: { bsonType: "string" },
        price: { bsonType: "double" },
        image: { bsonType: "string" },
        category: { bsonType: "string" },
        isVegetarian: { bsonType: "bool" },
        isVegan: { bsonType: "bool" },
        isSpicy: { bsonType: "bool" },
        spicyLevel: { bsonType: "int" },
        calories: { bsonType: "int" },
        preparationTime: { bsonType: "int" },
        availability: { bsonType: "bool" },
        rating: { bsonType: "double" },
        reviewCount: { bsonType: "int" },
        orderCount: { bsonType: "int" },
        addons: [
          {
            bsonType: "object",
            properties: {
              name: { bsonType: "string" },
              price: { bsonType: "double" }
            }
          }
        ],
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.menuItems.createIndex({ restaurantId: 1 });
db.menuItems.createIndex({ category: 1 });
db.menuItems.createIndex({ name: "text", description: "text" });
db.menuItems.createIndex({ availability: 1 });
```

### 4. Orders Collection

```javascript
db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["customerId", "restaurantId", "items", "totalAmount", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        orderNumber: { bsonType: "string", unique: true },
        customerId: { bsonType: "objectId" },
        restaurantId: { bsonType: "objectId" },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              menuItemId: { bsonType: "objectId" },
              name: { bsonType: "string" },
              quantity: { bsonType: "int" },
              price: { bsonType: "double" },
              specialInstructions: { bsonType: "string" }
            }
          }
        },
        subtotal: { bsonType: "double" },
        tax: { bsonType: "double" },
        deliveryFee: { bsonType: "double" },
        discount: { bsonType: "double" },
        totalAmount: { bsonType: "double" },
        orderStatus: {
          enum: ["pending", "confirmed", "preparing", "ready", "out_for_delivery", "delivered", "cancelled"]
        },
        deliveryAddress: { bsonType: "object" },
        paymentMethod: { enum: ["card", "wallet", "cash", "upi"] },
        paymentStatus: { enum: ["pending", "completed", "failed", "refunded"] },
        paymentId: { bsonType: "string" },
        transactionId: { bsonType: "string" },
        estimatedDeliveryTime: { bsonType: "date" },
        actualDeliveryTime: { bsonType: "date" },
        deliveryPartnerId: { bsonType: "objectId" },
        trackingLocation: {
          bsonType: "object",
          properties: {
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" },
            timestamp: { bsonType: "date" }
          }
        },
        specialInstructions: { bsonType: "string" },
        rating: { bsonType: "int" },
        review: { bsonType: "string" },
        ratedAt: { bsonType: "date" },
        cancelReason: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.orders.createIndex({ customerId: 1 });
db.orders.createIndex({ restaurantId: 1 });
db.orders.createIndex({ orderStatus: 1 });
db.orders.createIndex({ paymentStatus: 1 });
db.orders.createIndex({ createdAt: -1 });
db.orders.createIndex({ orderNumber: 1 }, { unique: true });
```

### 5. Chats Collection

```javascript
db.createCollection("chats", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        conversationId: { bsonType: "string" },
        participants: {
          bsonType: "array",
          items: { bsonType: "objectId" }
        },
        orderId: { bsonType: "objectId" },
        messages: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              _id: { bsonType: "objectId" },
              senderId: { bsonType: "objectId" },
              content: { bsonType: "string" },
              image: { bsonType: "string" },
              timestamp: { bsonType: "date" },
              isRead: { bsonType: "bool" },
              readAt: { bsonType: "date" }
            }
          }
        },
        lastMessage: { bsonType: "string" },
        lastMessageTime: { bsonType: "date" },
        lastMessageSender: { bsonType: "objectId" },
        isActive: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.chats.createIndex({ conversationId: 1 });
db.chats.createIndex({ participants: 1 });
db.chats.createIndex({ orderId: 1 });
db.chats.createIndex({ createdAt: -1 });
```

### 6. Reviews Collection

```javascript
db.createCollection("reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "restaurantId", "rating", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        restaurantId: { bsonType: "objectId" },
        orderId: { bsonType: "objectId" },
        rating: { bsonType: "int", minimum: 1, maximum: 5 },
        title: { bsonType: "string" },
        content: { bsonType: "string" },
        images: { bsonType: "array", items: { bsonType: "string" } },
        isVerifiedPurchase: { bsonType: "bool" },
        helpful: { bsonType: "int" },
        unhelpful: { bsonType: "int" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.reviews.createIndex({ restaurantId: 1, createdAt: -1 });
db.reviews.createIndex({ userId: 1 });
db.reviews.createIndex({ rating: 1 });
```

### 7. Payments Collection

```javascript
db.createCollection("payments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "amount", "status", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        orderId: { bsonType: "objectId" },
        amount: { bsonType: "double" },
        currency: { bsonType: "string" },
        status: { enum: ["pending", "completed", "failed", "refunded"] },
        paymentMethod: { enum: ["card", "wallet", "cash", "upi"] },
        stripePaymentIntentId: { bsonType: "string" },
        stripeChargeId: { bsonType: "string" },
        transactionId: { bsonType: "string" },
        cardDetails: {
          bsonType: "object",
          properties: {
            brand: { bsonType: "string" },
            last4: { bsonType: "string" }
          }
        },
        failureReason: { bsonType: "string" },
        refundAmount: { bsonType: "double" },
        refundReason: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.payments.createIndex({ userId: 1 });
db.payments.createIndex({ orderId: 1 });
db.payments.createIndex({ status: 1 });
db.payments.createIndex({ createdAt: -1 });
```

### 8. Favorites Collection

```javascript
db.createCollection("favorites", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "restaurantId", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        restaurantId: { bsonType: "objectId" },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.favorites.createIndex({ userId: 1, restaurantId: 1 }, { unique: true });
db.favorites.createIndex({ userId: 1 });
```

### 9. Notifications Collection

```javascript
db.createCollection("notifications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "type", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        type: { enum: ["order", "promotion", "message", "system", "payment"] },
        title: { bsonType: "string" },
        message: { bsonType: "string" },
        data: { bsonType: "object" },
        isRead: { bsonType: "bool" },
        readAt: { bsonType: "date" },
        createdAt: { bsonType: "date" }
      }
    }
  },
  expireAfterSeconds: 2592000 // 30 days
});

// Indexes
db.notifications.createIndex({ userId: 1, createdAt: -1 });
db.notifications.createIndex({ isRead: 1 });
db.notifications.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 });
```

### 10. Analytics Collection

```javascript
db.createCollection("analytics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        date: { bsonType: "date" },
        totalOrders: { bsonType: "int" },
        totalRevenue: { bsonType: "double" },
        totalUsers: { bsonType: "int" },
        newUsers: { bsonType: "int" },
        activeRestaurants: { bsonType: "int" },
        averageOrderValue: { bsonType: "double" },
        topRestaurants: { bsonType: "array" },
        topCuisines: { bsonType: "array" },
        cancellationRate: { bsonType: "double" },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.analytics.createIndex({ date: -1 });
```

---

## Relationships

```
User (Customer)
├── Orders (1:Many)
├── Reviews (1:Many)
├── Favorites (1:Many)
├── Chats (1:Many)
└── Payments (1:Many)

User (Vendor)
├── Restaurants (1:Many)
└── Chats (1:Many)

Restaurant
├── MenuItems (1:Many)
├── Orders (1:Many)
└── Reviews (1:Many)

Order
├── MenuItems (Many:Many)
├── Reviews (1:1)
├── Payments (1:1)
├── Chats (1:Many)
└── Notifications (1:Many)
```

---

## Data Integrity Rules

1. **Referential Integrity** - Foreign keys should reference valid documents
2. **Unique Constraints** - Email, phone, order number must be unique
3. **Validation Rules** - Rating between 0-5, status from enum
4. **Timestamp Rules** - updatedAt >= createdAt
5. **Amount Validation** - All monetary fields >= 0
6. **Status Workflow** - Orders follow defined status transitions

---

## Backup & Recovery

- **Automated Backups** - Daily backups to cloud storage
- **Point-in-time Recovery** - Last 7 days
- **Data Replication** - Multi-region replication
- **Disaster Recovery Plan** - RTO: 1 hour, RPO: 15 minutes
