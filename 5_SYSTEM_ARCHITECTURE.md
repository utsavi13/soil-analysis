# SYSTEM ARCHITECTURE DIAGRAM
## Soil Analysis and Crop Recommendation System

---

## THREE-TIER ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SYSTEM ARCHITECTURE                              │
└─────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                     PRESENTATION TIER                               │
│                        (Frontend)                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   HTML5      │  │    CSS3      │  │  JavaScript  │            │
│  │  Structure   │  │   Styling    │  │    Logic     │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │              User Interface Components                  │      │
│  ├─────────────────────────────────────────────────────────┤      │
│  │  • Home Page          • Dashboard                       │      │
│  │  • Registration       • Soil Test Input                 │      │
│  │  • Login              • Results Display                 │      │
│  │  • Reports            • Print View                      │      │
│  └─────────────────────────────────────────────────────────┘      │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │           Client-Side Features                          │      │
│  ├─────────────────────────────────────────────────────────┤      │
│  │  • Form Validation    • Local Storage                   │      │
│  │  • AJAX Requests      • Token Management                │      │
│  │  • Dynamic Rendering  • Responsive Design               │      │
│  └─────────────────────────────────────────────────────────┘      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              │ REST API Calls
                              │ JSON Data
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      APPLICATION TIER                               │
│                         (Backend)                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │              Node.js Runtime Environment                │      │
│  └─────────────────────────────────────────────────────────┘      │
│                              │                                      │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │              Express.js Web Framework                   │      │
│  └─────────────────────────────────────────────────────────┘      │
│                              │                                      │
│  ┌──────────────────────────┴──────────────────────────┐          │
│  │                                                      │          │
│  ▼                                                      ▼          │
│  ┌─────────────────────┐              ┌─────────────────────┐    │
│  │   Middleware Layer  │              │   Route Handlers    │    │
│  ├─────────────────────┤              ├─────────────────────┤    │
│  │ • CORS              │              │ • Auth Routes       │    │
│  │ • Body Parser       │              │ • Soil Test Routes  │    │
│  │ • JWT Verification  │              │ • Recommendation    │    │
│  │ • Error Handling    │              │   Routes            │    │
│  └─────────────────────┘              └─────────────────────┘    │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │              Business Logic Layer                       │      │
│  ├─────────────────────────────────────────────────────────┤      │
│  │                                                         │      │
│  │  ┌──────────────────┐    ┌──────────────────┐         │      │
│  │  │  Authentication  │    │  Soil Test       │         │      │
│  │  │  Module          │    │  Processing      │         │      │
│  │  ├──────────────────┤    ├──────────────────┤         │      │
│  │  │ • Registration   │    │ • Data Validation│         │      │
│  │  │ • Login          │    │ • Storage        │         │      │
│  │  │ • Password Hash  │    │ • Retrieval      │         │      │
│  │  │ • JWT Generation │    └──────────────────┘         │      │
│  │  └──────────────────┘                                  │      │
│  │                                                         │      │
│  │  ┌──────────────────────────────────────────┐         │      │
│  │  │    Recommendation Engine                 │         │      │
│  │  ├──────────────────────────────────────────┤         │      │
│  │  │  Crop Recommendation Algorithm:          │         │      │
│  │  │  • Fetch crop requirements               │         │      │
│  │  │  • Calculate pH compatibility            │         │      │
│  │  │  • Compute NPK deviations                │         │      │
│  │  │  • Score and rank crops                  │         │      │
│  │  │  • Select top 5 crops                    │         │      │
│  │  │                                           │         │      │
│  │  │  Fertilizer Suggestion Algorithm:        │         │      │
│  │  │  • Identify nutrient deficiencies        │         │      │
│  │  │  • Query suitable fertilizers            │         │      │
│  │  │  • Calculate application amounts         │         │      │
│  │  │  • Generate recommendations              │         │      │
│  │  └──────────────────────────────────────────┘         │      │
│  │                                                         │      │
│  └─────────────────────────────────────────────────────────┘      │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │              Security Layer                             │      │
│  ├─────────────────────────────────────────────────────────┤      │
│  │ • Bcrypt Password Hashing                               │      │
│  │ • JWT Token Authentication                              │      │
│  │ • Input Sanitization                                    │      │
│  │ • SQL Injection Prevention                              │      │
│  └─────────────────────────────────────────────────────────┘      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ SQL Queries
                              │ Connection Pool
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA TIER                                    │
│                       (Database)                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │              MySQL Database Server                      │      │
│  └─────────────────────────────────────────────────────────┘      │
│                              │                                      │
│  ┌──────────────────────────┴──────────────────────────┐          │
│  │                                                      │          │
│  ▼                                                      ▼          │
│  ┌─────────────────────┐              ┌─────────────────────┐    │
│  │  Transactional Data │              │   Master Data       │    │
│  ├─────────────────────┤              ├─────────────────────┤    │
│  │ • farmers           │              │ • crops             │    │
│  │ • soil_tests        │              │ • ideal_requirements│    │
│  │ • recommendations   │              │ • fertilizers       │    │
│  └─────────────────────┘              └─────────────────────┘    │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │              Database Features                          │      │
│  ├─────────────────────────────────────────────────────────┤      │
│  │ • ACID Compliance                                       │      │
│  │ • Foreign Key Constraints                               │      │
│  │ • Indexes for Performance                               │      │
│  │ • Connection Pooling                                    │      │
│  │ • Backup and Recovery                                   │      │
│  └─────────────────────────────────────────────────────────┘      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## COMPONENT INTERACTION FLOW

### User Registration Flow
```
Browser → POST /api/register → Express Router → Auth Controller
                                                      ↓
                                              Validate Input
                                                      ↓
                                              Hash Password
                                                      ↓
                                              MySQL: INSERT farmers
                                                      ↓
                                              Return Success
                                                      ↓
Browser ← JSON Response ← Express Router ← Auth Controller
```

### Login Flow
```
Browser → POST /api/login → Express Router → Auth Controller
                                                   ↓
                                           Validate Credentials
                                                   ↓
                                           MySQL: SELECT farmers
                                                   ↓
                                           Verify Password
                                                   ↓
                                           Generate JWT Token
                                                   ↓
Browser ← Token + User Data ← Express Router ← Auth Controller
```

### Soil Test Submission Flow
```
Browser → POST /api/soil-test → Express Router → JWT Middleware
                                                       ↓
                                                 Verify Token
                                                       ↓
                                                 Soil Test Controller
                                                       ↓
                                                 Validate Input
                                                       ↓
                                                 MySQL: INSERT soil_tests
                                                       ↓
                                                 Recommendation Engine
                                                       ↓
                                    ┌──────────────────┴──────────────────┐
                                    ▼                                     ▼
                          MySQL: SELECT crops              MySQL: SELECT fertilizers
                          & ideal_requirements
                                    │                                     │
                                    └──────────────────┬──────────────────┘
                                                       ▼
                                              Calculate Recommendations
                                                       ↓
                                              MySQL: INSERT recommendations
                                                       ↓
Browser ← Recommendations ← Express Router ← Soil Test Controller
```

---

## TECHNOLOGY STACK DETAILS

### Frontend Technologies
- **HTML5**: Semantic markup, form elements
- **CSS3**: Flexbox, Grid, Media Queries, Animations
- **JavaScript ES6+**: Async/Await, Fetch API, Local Storage
- **Responsive Design**: Mobile-first approach

### Backend Technologies
- **Node.js v14+**: JavaScript runtime
- **Express.js v4**: Web application framework
- **mysql2**: MySQL client for Node.js
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Database
- **MySQL v8+**: Relational database
- **InnoDB Engine**: ACID compliance
- **Connection Pooling**: Performance optimization

---

## SECURITY ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                          │
└─────────────────────────────────────────────────────────────┘

Layer 1: Transport Security
├─ HTTPS/TLS encryption (recommended for production)
└─ Secure headers

Layer 2: Authentication
├─ JWT token-based authentication
├─ Token expiration (24 hours)
└─ Secure token storage (localStorage)

Layer 3: Authorization
├─ Middleware token verification
├─ User ownership validation
└─ Protected route access

Layer 4: Data Security
├─ Bcrypt password hashing (10 salt rounds)
├─ Parameterized SQL queries
├─ Input validation and sanitization
└─ SQL injection prevention

Layer 5: Application Security
├─ CORS configuration
├─ Rate limiting (recommended)
├─ Error handling without data leakage
└─ Environment variable protection
```

---

## API ARCHITECTURE

### RESTful API Design

```
┌─────────────────────────────────────────────────────────────┐
│                    API ENDPOINTS                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Authentication Endpoints:                                  │
│  POST   /api/register          Create new farmer           │
│  POST   /api/login             Authenticate farmer         │
│                                                             │
│  Soil Test Endpoints:                                       │
│  POST   /api/soil-test         Submit soil test (Auth)     │
│  GET    /api/reports/:farmerId Get test history (Auth)     │
│                                                             │
│  Recommendation Endpoints:                                  │
│  GET    /api/recommendations/:testId                        │
│                                Get recommendations (Auth)   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Request/Response Format: JSON
Authentication: Bearer Token (JWT)
Status Codes: 200, 201, 400, 401, 403, 404, 500
```

---

## DATABASE ARCHITECTURE

### Connection Management
```
┌─────────────────────────────────────────────────────────────┐
│              DATABASE CONNECTION POOL                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Configuration:                                             │
│  ├─ Host: localhost                                         │
│  ├─ User: root                                              │
│  ├─ Database: soil_analysis_db                              │
│  ├─ Connection Limit: 10                                    │
│  └─ Wait for Connections: true                              │
│                                                             │
│  Features:                                                  │
│  ├─ Automatic connection reuse                              │
│  ├─ Connection timeout handling                             │
│  ├─ Error recovery                                          │
│  └─ Promise-based queries                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## DEPLOYMENT ARCHITECTURE

### Development Environment
```
┌─────────────────────────────────────────────────────────────┐
│              DEVELOPMENT SETUP                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend: http://localhost:8080                            │
│  Backend:  http://localhost:3000                            │
│  Database: localhost:3306                                   │
│                                                             │
│  Tools:                                                     │
│  ├─ npm for package management                              │
│  ├─ nodemon for auto-restart                                │
│  └─ http-server for frontend serving                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Production Environment (Recommended)
```
┌─────────────────────────────────────────────────────────────┐
│              PRODUCTION ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                            │
│  │   CDN       │  Static Assets (CSS, JS, Images)          │
│  └─────────────┘                                            │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────┐                                            │
│  │ Load        │  Distribute Traffic                        │
│  │ Balancer    │                                            │
│  └─────────────┘                                            │
│         │                                                   │
│    ┌────┴────┐                                              │
│    ▼         ▼                                              │
│  ┌────┐   ┌────┐                                            │
│  │App │   │App │  Node.js Instances                         │
│  │ 1  │   │ 2  │                                            │
│  └────┘   └────┘                                            │
│    │         │                                              │
│    └────┬────┘                                              │
│         ▼                                                   │
│  ┌─────────────┐                                            │
│  │  Database   │  MySQL Master-Slave                        │
│  │  Cluster    │  Replication                               │
│  └─────────────┘                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## SCALABILITY CONSIDERATIONS

### Horizontal Scaling
- Multiple Node.js instances behind load balancer
- Stateless application design
- JWT tokens eliminate session storage

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Database query optimization
- Connection pool tuning

### Caching Strategy
- Redis for frequently accessed data
- Cache crop and fertilizer master data
- Cache recommendation results

### Database Optimization
- Proper indexing on foreign keys
- Query optimization
- Read replicas for reporting

---

## MONITORING AND LOGGING

```
┌─────────────────────────────────────────────────────────────┐
│              MONITORING ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Application Logs:                                          │
│  ├─ Request/Response logging                                │
│  ├─ Error tracking                                          │
│  └─ Performance metrics                                     │
│                                                             │
│  Database Monitoring:                                       │
│  ├─ Query performance                                       │
│  ├─ Connection pool status                                  │
│  └─ Slow query log                                          │
│                                                             │
│  System Monitoring:                                         │
│  ├─ CPU and memory usage                                    │
│  ├─ Disk I/O                                                │
│  └─ Network traffic                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

END OF SYSTEM ARCHITECTURE DOCUMENTATION
