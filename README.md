# Soil Analysis and Crop Recommendation System

A Database-Driven Decision Support System (DSS) for precision agriculture.

## Project Overview

The Soil Analysis and Crop Recommendation project is a Database-Driven Decision Support System (DSS) designed to replace generalized farming practices with data-driven precision agriculture. Its core function is to analyze the critical input of a farmer's field-specific soil test results (including pH and NPK levels). This data is processed by the system, which compares it against a comprehensive database of ideal crop requirements and fertilizer compositions. This intelligent comparison generates customized, actionable recommendations for the most suitable crops to cultivate and the specific fertilizers needed to correct any nutrient deficiencies.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT-based

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MySQL (v8+) or XAMPP
- npm

### 🎯 XAMPP Users
If you're using XAMPP, follow the **XAMPP_SETUP_GUIDE.md** for step-by-step instructions!

Quick start files included:
- `XAMPP_SETUP_GUIDE.md` - Complete XAMPP setup guide
- `XAMPP_QUICK_START.txt` - Quick reference card
- `START_BACKEND.bat` - Double-click to start backend
- `START_FRONTEND.bat` - Double-click to start frontend

### Database Setup
1. Create MySQL database:
```sql
CREATE DATABASE soil_analysis_db;
```

2. Import the schema:
```bash
mysql -u root -p soil_analysis_db < database/schema.sql
```

3. Import sample data:
```bash
mysql -u root -p soil_analysis_db < database/sample_data.sql
```

### Backend Setup
1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection in `config/db.js`

4. Start the server:
```bash
npm start
```

Server runs on http://localhost:3000

### Frontend Setup
1. Open `frontend/index.html` in a browser, or
2. Use a simple HTTP server:
```bash
cd frontend
npx http-server -p 8080
```

Access at http://localhost:8080

## Features

- **Complete CRUD Operations:**
  - ✅ Create: Register farmers, Submit soil tests
  - ✅ Read: View all reports, View recommendations
  - ✅ Update: Edit soil test data
  - ✅ Delete: Remove soil tests
- Farmer registration and authentication
- Soil test data input (pH, N, P, K)
- Intelligent crop recommendation algorithm
- Fertilizer suggestions based on deficiencies
- Historical test reports with Edit/Delete buttons
- Mobile-responsive design

## Project Structure

```
/frontend          - HTML, CSS, JS files
/backend           - Node.js Express API
/database          - SQL schema and sample data
/documentation     - Project report and diagrams
/assets            - Images and icons
```

## API Endpoints

- POST /api/register - Register new farmer
- POST /api/login - Authenticate farmer
- POST /api/soil-test - Submit soil test data
- GET /api/recommendations/:testId - Get recommendations
- GET /api/reports/:farmerId - Get farmer's test history

## License

MIT
