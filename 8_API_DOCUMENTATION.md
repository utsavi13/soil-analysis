# API DOCUMENTATION
## Soil Analysis and Crop Recommendation System

---

## BASE URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

---

## AUTHENTICATION

The API uses JWT (JSON Web Token) for authentication.

### Token Format
```
Authorization: Bearer <token>
```

### Token Expiration
- Tokens expire after 24 hours
- Refresh by logging in again

---

## API ENDPOINTS

### 1. REGISTER FARMER

Create a new farmer account.

**Endpoint:** `POST /api/register`

**Authentication:** Not required

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Farmer",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "securepassword123"
}
```

**Field Validations:**
- `name`: Required, string
- `email`: Required, valid email format, unique
- `phone`: Optional, string
- `password`: Required, minimum 6 characters

**Success Response:**

Status Code: `201 Created`

```json
{
  "message": "Farmer registered successfully",
  "farmerId": 1
}
```

**Error Responses:**

Status Code: `400 Bad Request`
```json
{
  "error": "Name, email, and password are required"
}
```

```json
{
  "error": "Email already registered"
}
```

Status Code: `500 Internal Server Error`
```json
{
  "error": "Registration failed"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Farmer",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "securepassword123"
  }'
```

---

### 2. LOGIN

Authenticate farmer and receive JWT token.

**Endpoint:** `POST /api/login`

**Authentication:** Not required

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Field Validations:**
- `email`: Required, valid email format
- `password`: Required

**Success Response:**

Status Code: `200 OK`

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "farmer": {
    "id": 1,
    "name": "John Farmer",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

Status Code: `400 Bad Request`
```json
{
  "error": "Email and password are required"
}
```

Status Code: `401 Unauthorized`
```json
{
  "error": "Invalid credentials"
}
```

Status Code: `500 Internal Server Error`
```json
{
  "error": "Login failed"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

---

### 3. SUBMIT SOIL TEST

Submit soil test data and receive recommendations.

**Endpoint:** `POST /api/soil-test`

**Authentication:** Required (JWT Token)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "pH": 6.5,
  "nitrogen": 80,
  "phosphorus": 45,
  "potassium": 50
}
```

**Field Validations:**
- `pH`: Required, number, 0-14
- `nitrogen`: Required, number, >= 0
- `phosphorus`: Required, number, >= 0
- `potassium`: Required, number, >= 0

**Success Response:**

Status Code: `201 Created`

```json
{
  "message": "Soil test submitted successfully",
  "testId": 1,
  "recommendations": {
    "soilData": {
      "pH": 6.5,
      "nitrogen": 80,
      "phosphorus": 45,
      "potassium": 50
    },
    "crops": [
      {
        "cropId": 2,
        "cropName": "Wheat",
        "score": 95.5,
        "deviations": {
          "nitrogen": -20,
          "phosphorus": -5,
          "potassium": 0
        },
        "idealRequirements": {
          "pH": "6.0-7.5",
          "N": 100,
          "P": 50,
          "K": 50
        }
      },
      {
        "cropId": 1,
        "cropName": "Rice",
        "score": 92.3,
        "deviations": {
          "nitrogen": -40,
          "phosphorus": -15,
          "potassium": -10
        },
        "idealRequirements": {
          "pH": "5.5-7.0",
          "N": 120,
          "P": 60,
          "K": 60
        }
      }
    ],
    "fertilizers": [
      {
        "nutrient": "Nitrogen",
        "deficiency": "20.00",
        "status": "Low",
        "fertilizer": "Urea",
        "composition": "46% N",
        "estimatedAmount": "44 kg/hectare"
      }
    ]
  }
}
```

**Error Responses:**

Status Code: `400 Bad Request`
```json
{
  "error": "All soil parameters are required"
}
```

Status Code: `401 Unauthorized`
```json
{
  "error": "Access token required"
}
```

Status Code: `403 Forbidden`
```json
{
  "error": "Invalid or expired token"
}
```

Status Code: `500 Internal Server Error`
```json
{
  "error": "Failed to submit soil test"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/soil-test \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "pH": 6.5,
    "nitrogen": 80,
    "phosphorus": 45,
    "potassium": 50
  }'
```

---

### 4. GET RECOMMENDATIONS

Retrieve recommendations for a specific test.

**Endpoint:** `GET /api/recommendations/:testId`

**Authentication:** Required (JWT Token)

**Request Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `testId`: Test ID (integer)

**Success Response:**

Status Code: `200 OK`

```json
{
  "testData": {
    "test_id": 1,
    "farmer_id": 1,
    "pH": 6.5,
    "nitrogen": 80,
    "phosphorus": 45,
    "potassium": 50,
    "test_date": "2024-11-14T10:30:00.000Z"
  },
  "recommendations": {
    "crops": [
      {
        "cropId": 2,
        "cropName": "Wheat",
        "score": 95.5,
        "deviations": {
          "nitrogen": -20,
          "phosphorus": -5,
          "potassium": 0
        },
        "idealRequirements": {
          "pH": "6.0-7.5",
          "N": 100,
          "P": 50,
          "K": 50
        }
      }
    ],
    "fertilizers": [
      {
        "nutrient": "Nitrogen",
        "deficiency": "20.00",
        "status": "Low",
        "fertilizer": "Urea",
        "composition": "46% N",
        "estimatedAmount": "44 kg/hectare"
      }
    ]
  }
}
```

**Error Responses:**

Status Code: `401 Unauthorized`
```json
{
  "error": "Access token required"
}
```

Status Code: `403 Forbidden`
```json
{
  "error": "Unauthorized access"
}
```

Status Code: `404 Not Found`
```json
{
  "error": "Test not found"
}
```

```json
{
  "error": "Recommendations not found"
}
```

Status Code: `500 Internal Server Error`
```json
{
  "error": "Failed to fetch recommendations"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/recommendations/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 5. GET FARMER REPORTS

Retrieve all soil test reports for a farmer.

**Endpoint:** `GET /api/reports/:farmerId`

**Authentication:** Required (JWT Token)

**Request Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `farmerId`: Farmer ID (integer)

**Success Response:**

Status Code: `200 OK`

```json
{
  "reports": [
    {
      "test_id": 2,
      "farmer_id": 1,
      "pH": 6.8,
      "nitrogen": 90,
      "phosphorus": 55,
      "potassium": 60,
      "test_date": "2024-11-14T15:45:00.000Z",
      "recommended_crops": "[{\"cropId\":2,\"cropName\":\"Wheat\",\"score\":98.5}]",
      "fertilizer_suggestions": "[{\"nutrient\":\"Balanced\",\"status\":\"Normal\"}]"
    },
    {
      "test_id": 1,
      "farmer_id": 1,
      "pH": 6.5,
      "nitrogen": 80,
      "phosphorus": 45,
      "potassium": 50,
      "test_date": "2024-11-14T10:30:00.000Z",
      "recommended_crops": "[{\"cropId\":2,\"cropName\":\"Wheat\",\"score\":95.5}]",
      "fertilizer_suggestions": "[{\"nutrient\":\"Nitrogen\",\"status\":\"Low\"}]"
    }
  ]
}
```

**Error Responses:**

Status Code: `401 Unauthorized`
```json
{
  "error": "Access token required"
}
```

Status Code: `403 Forbidden`
```json
{
  "error": "Unauthorized access"
}
```

Status Code: `500 Internal Server Error`
```json
{
  "error": "Failed to fetch reports"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/reports/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ERROR CODES

| Status Code | Meaning |
|-------------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## RESPONSE FORMATS

### Success Response Format
```json
{
  "message": "Success message",
  "data": { }
}
```

### Error Response Format
```json
{
  "error": "Error message description"
}
```

---

## RATE LIMITING

Currently, no rate limiting is implemented. For production:
- Recommended: 100 requests per 15 minutes per IP
- Use express-rate-limit package

---

## CORS POLICY

CORS is enabled for all origins in development.

For production, configure specific origins:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

---

## TESTING WITH POSTMAN

### Collection Setup

1. Create new collection: "Soil Analysis API"
2. Set base URL variable: `{{baseUrl}}` = `http://localhost:3000/api`
3. Set token variable: `{{token}}`

### Test Sequence

**1. Register:**
- Method: POST
- URL: `{{baseUrl}}/register`
- Body: Raw JSON with farmer data

**2. Login:**
- Method: POST
- URL: `{{baseUrl}}/login`
- Body: Raw JSON with credentials
- Save token from response

**3. Submit Soil Test:**
- Method: POST
- URL: `{{baseUrl}}/soil-test`
- Headers: `Authorization: Bearer {{token}}`
- Body: Raw JSON with soil data

**4. Get Recommendations:**
- Method: GET
- URL: `{{baseUrl}}/recommendations/1`
- Headers: `Authorization: Bearer {{token}}`

**5. Get Reports:**
- Method: GET
- URL: `{{baseUrl}}/reports/1`
- Headers: `Authorization: Bearer {{token}}`

---

## SAMPLE REQUESTS

### JavaScript (Fetch API)

**Register:**
```javascript
fetch('http://localhost:3000/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Farmer',
    email: 'john@example.com',
    phone: '9876543210',
    password: 'securepassword123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

**Login:**
```javascript
fetch('http://localhost:3000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securepassword123'
  })
})
.then(response => response.json())
.then(data => {
  localStorage.setItem('authToken', data.token);
  console.log(data);
})
.catch(error => console.error('Error:', error));
```

**Submit Soil Test:**
```javascript
const token = localStorage.getItem('authToken');

fetch('http://localhost:3000/api/soil-test', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    pH: 6.5,
    nitrogen: 80,
    phosphorus: 45,
    potassium: 50
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

## SECURITY BEST PRACTICES

### For API Consumers

1. **Store tokens securely**
   - Use localStorage or sessionStorage
   - Never expose tokens in URLs
   - Clear tokens on logout

2. **Validate input on client-side**
   - Check data types and ranges
   - Provide user-friendly error messages

3. **Handle errors gracefully**
   - Check response status codes
   - Display appropriate error messages
   - Implement retry logic for network errors

4. **Use HTTPS in production**
   - Never send credentials over HTTP
   - Validate SSL certificates

### For API Developers

1. **Input validation**
   - Validate all input data
   - Sanitize user inputs
   - Use parameterized queries

2. **Authentication**
   - Use strong JWT secrets
   - Implement token expiration
   - Validate tokens on every protected route

3. **Error handling**
   - Don't expose sensitive information in errors
   - Log errors for debugging
   - Return generic error messages to clients

4. **Rate limiting**
   - Implement rate limiting
   - Prevent brute force attacks
   - Monitor for suspicious activity

---

## CHANGELOG

### Version 1.0.0 (Current)
- Initial API release
- User registration and authentication
- Soil test submission
- Crop recommendation algorithm
- Fertilizer suggestion algorithm
- Historical reports

### Planned Features
- Password reset functionality
- Email verification
- Profile management
- Export reports as PDF
- Advanced filtering for reports
- Crop yield prediction

---

END OF API DOCUMENTATION
