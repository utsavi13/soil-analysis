# QUICK INSTALLATION GUIDE
## Soil Analysis and Crop Recommendation System

---

## QUICK START (5 Minutes)

### Step 1: Install Prerequisites

- **Node.js**: Download from https://nodejs.org/ (v14+)
- **MySQL**: Download from https://dev.mysql.com/downloads/ (v8+)

### Step 2: Setup Database

```bash
# Login to MySQL
mysql -u root -p

# Create database and import schema
CREATE DATABASE soil_analysis_db;
USE soil_analysis_db;
SOURCE database/schema.sql;
SOURCE database/sample_data.sql;
exit;
```

### Step 3: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure database (edit .env file)
# Set your MySQL password in DB_PASSWORD

# Start server
npm start
```

Server will run on http://localhost:3000

### Step 4: Setup Frontend

```bash
# Open new terminal
# Navigate to frontend folder
cd frontend

# Install http-server globally
npm install -g http-server

# Start frontend server
http-server -p 8080
```

Frontend will run on http://localhost:8080

### Step 5: Access Application

Open browser and go to: **http://localhost:8080**

---

## DEFAULT CREDENTIALS (For Testing)

After running sample_data.sql, you can use:
- **Email**: john@example.com
- **Password**: farmer123

Or register a new account.

---

## SAMPLE SOIL TEST DATA

Use these values for testing:

**Test 1 - Good Soil:**
- pH: 6.5
- Nitrogen: 100
- Phosphorus: 50
- Potassium: 50

**Test 2 - Nitrogen Deficient:**
- pH: 6.8
- Nitrogen: 40
- Phosphorus: 55
- Potassium: 60

**Test 3 - Acidic Soil:**
- pH: 5.2
- Nitrogen: 80
- Phosphorus: 45
- Potassium: 50

---

## TROUBLESHOOTING

**Backend won't start:**
```bash
cd backend
npm install
# Check .env file for correct MySQL password
```

**Database connection error:**
- Verify MySQL is running
- Check username/password in .env
- Ensure database exists

**Frontend can't connect:**
- Verify backend is running on port 3000
- Check browser console for errors
- Clear browser cache

---

## NEED HELP?

Refer to detailed documentation in `/documentation` folder:
- 7_SETUP_GUIDE.md - Complete setup instructions
- 8_API_DOCUMENTATION.md - API reference
- 1_PROJECT_REPORT.md - Full project documentation

---

## PROJECT STRUCTURE

```
/
├── frontend/          # HTML, CSS, JS files
├── backend/           # Node.js Express API
├── database/          # SQL schema and data
├── documentation/     # Complete documentation
├── assets/            # Images and icons
├── README.md          # Project overview
└── INSTALLATION.md    # This file
```

---

**Ready to use!** 🎉
