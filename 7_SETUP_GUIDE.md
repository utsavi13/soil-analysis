# COMPLETE SETUP GUIDE
## Soil Analysis and Crop Recommendation System

---

## TABLE OF CONTENTS

1. Prerequisites
2. Database Setup
3. Backend Setup
4. Frontend Setup
5. Testing the Application
6. Troubleshooting
7. Production Deployment

---

## 1. PREREQUISITES

### Required Software

**Node.js and npm:**
- Version: Node.js 14.x or higher
- Download: https://nodejs.org/
- Verify installation:
```bash
node --version
npm --version
```

**MySQL:**
- Version: MySQL 8.0 or higher
- Download: https://dev.mysql.com/downloads/mysql/
- Verify installation:
```bash
mysql --version
```

**Text Editor/IDE:**
- VS Code (recommended)
- Sublime Text
- Atom
- Or any preferred editor

**Web Browser:**
- Chrome (recommended)
- Firefox
- Edge
- Safari

---

## 2. DATABASE SETUP

### Step 1: Start MySQL Server

**Windows:**
```cmd
net start MySQL80
```

**Mac/Linux:**
```bash
sudo systemctl start mysql
# or
sudo service mysql start
```

### Step 2: Login to MySQL

```bash
mysql -u root -p
```
Enter your MySQL root password when prompted.

### Step 3: Create Database

```sql
CREATE DATABASE soil_analysis_db;
USE soil_analysis_db;
```

### Step 4: Import Schema

**Option A: From MySQL Command Line**
```sql
SOURCE /path/to/database/schema.sql;
```

**Option B: From Terminal/Command Prompt**
```bash
mysql -u root -p soil_analysis_db < database/schema.sql
```

### Step 5: Import Sample Data

```bash
mysql -u root -p soil_analysis_db < database/sample_data.sql
```

### Step 6: Verify Database Setup

```sql
USE soil_analysis_db;
SHOW TABLES;
```

You should see:
- farmers
- soil_tests
- crops
- ideal_requirements
- fertilizers
- recommendations

**Check sample data:**
```sql
SELECT COUNT(*) FROM crops;
SELECT COUNT(*) FROM fertilizers;
```

---

## 3. BACKEND SETUP

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express
- mysql2
- bcrypt
- jsonwebtoken
- cors
- dotenv
- body-parser

### Step 3: Configure Environment Variables

Edit the `.env` file in the backend directory:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=soil_analysis_db
JWT_SECRET=your_secret_key_here_change_in_production
```

**Important:** Replace `your_mysql_password` with your actual MySQL password.

### Step 4: Test Database Connection

Create a test file `test-db.js`:

```javascript
const db = require('./config/db');

async function testConnection() {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('Database connected successfully!');
        console.log('Test query result:', rows[0].result);
        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

testConnection();
```

Run the test:
```bash
node test-db.js
```

### Step 5: Start Backend Server

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
Server is running on port 3000
```

### Step 6: Test API Endpoints

**Test health check:**
```bash
curl http://localhost:3000/
```

Expected response:
```json
{"message":"Soil Analysis API is running"}
```

---

## 4. FRONTEND SETUP

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Verify File Structure

Ensure you have:
```
frontend/
├── index.html
├── register.html
├── login.html
├── dashboard.html
├── soil-test.html
├── results.html
├── reports.html
├── css/
│   └── style.css
└── js/
    ├── config.js
    ├── register.js
    ├── login.js
    ├── dashboard.js
    ├── soil-test.js
    ├── results.js
    └── reports.js
```

### Step 3: Start Frontend Server

**Option A: Using http-server (Recommended)**

Install http-server globally:
```bash
npm install -g http-server
```

Start server:
```bash
http-server -p 8080
```

**Option B: Using Python**

Python 3:
```bash
python -m http.server 8080
```

Python 2:
```bash
python -m SimpleHTTPServer 8080
```

**Option C: Using VS Code Live Server**

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

---

## 5. TESTING THE APPLICATION

### Test Case 1: User Registration

1. Navigate to http://localhost:8080
2. Click "Get Started" or "Register"
3. Fill in the form:
   - Name: Test Farmer
   - Email: test@example.com
   - Phone: 1234567890
   - Password: test123
   - Confirm Password: test123
4. Click "Register"
5. You should be redirected to login page

### Test Case 2: User Login

1. On login page, enter:
   - Email: test@example.com
   - Password: test123
2. Click "Login"
3. You should be redirected to dashboard

### Test Case 3: Submit Soil Test

1. From dashboard, click "Enter Soil Test"
2. Enter sample data:
   - pH: 6.5
   - Nitrogen: 80
   - Phosphorus: 45
   - Potassium: 50
3. Click "Submit & Get Recommendations"
4. You should see recommendations page

### Test Case 4: View Recommendations

Verify the results page shows:
- Soil summary with your input values
- Top 5 recommended crops
- Fertilizer suggestions (if any deficiencies)

### Test Case 5: View Previous Reports

1. Go back to dashboard
2. Click "Previous Reports"
3. You should see your test history
4. Click on a report to view details

---

## 6. TROUBLESHOOTING

### Problem: Backend won't start

**Error: "Cannot find module"**
```bash
cd backend
npm install
```

**Error: "Port 3000 already in use"**

Windows:
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -ti:3000 | xargs kill -9
```

Or change port in `.env` file.

### Problem: Database connection fails

**Error: "Access denied for user"**
- Check MySQL username and password in `.env`
- Verify MySQL server is running

**Error: "Unknown database"**
- Run database creation script again
- Verify database name in `.env`

**Error: "ER_NOT_SUPPORTED_AUTH_MODE"**

Run in MySQL:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Problem: Frontend can't connect to backend

**Error: "Network error" or "CORS error"**

1. Verify backend is running on port 3000
2. Check browser console for errors
3. Verify API URL in frontend JavaScript files
4. Ensure CORS is enabled in backend

### Problem: Login/Register not working

1. Open browser developer tools (F12)
2. Check Console tab for errors
3. Check Network tab for API responses
4. Verify backend is running
5. Check database for user data

### Problem: Recommendations not showing

1. Verify crops and fertilizers data in database:
```sql
SELECT COUNT(*) FROM crops;
SELECT COUNT(*) FROM ideal_requirements;
SELECT COUNT(*) FROM fertilizers;
```

2. Check browser console for JavaScript errors
3. Verify API response in Network tab

---

## 7. PRODUCTION DEPLOYMENT

### Environment Configuration

**Backend `.env` for Production:**
```env
PORT=3000
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=strong_production_password
DB_NAME=soil_analysis_db
JWT_SECRET=very_strong_random_secret_key
NODE_ENV=production
```

### Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Implement input sanitization
- [ ] Set up logging and monitoring
- [ ] Regular database backups
- [ ] Keep dependencies updated

### Deployment Options

**Option 1: Traditional Server (VPS)**

1. Install Node.js and MySQL on server
2. Clone repository
3. Set up environment variables
4. Install dependencies
5. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start backend/server.js --name soil-analysis-api
pm2 startup
pm2 save
```

**Option 2: Cloud Platforms**

**Heroku:**
- Backend: Deploy as Node.js app
- Database: Use ClearDB MySQL add-on
- Frontend: Deploy to Heroku or Netlify

**AWS:**
- Backend: EC2 or Elastic Beanstalk
- Database: RDS MySQL
- Frontend: S3 + CloudFront

**DigitalOcean:**
- Backend: Droplet with Node.js
- Database: Managed MySQL
- Frontend: App Platform or Spaces

### Database Backup

**Manual Backup:**
```bash
mysqldump -u root -p soil_analysis_db > backup_$(date +%Y%m%d).sql
```

**Automated Backup Script:**
```bash
#!/bin/bash
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -p soil_analysis_db > $BACKUP_DIR/backup_$DATE.sql
# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

### Monitoring

**Application Monitoring:**
- Use PM2 monitoring
- Set up error logging
- Monitor API response times

**Database Monitoring:**
- Monitor connection pool
- Track slow queries
- Monitor disk space

**Server Monitoring:**
- CPU and memory usage
- Disk I/O
- Network traffic

---

## 8. MAINTENANCE

### Regular Tasks

**Daily:**
- Check application logs
- Monitor error rates
- Verify backup completion

**Weekly:**
- Review database performance
- Check for security updates
- Analyze user activity

**Monthly:**
- Update dependencies
- Review and optimize queries
- Clean up old data if needed

### Updating the Application

```bash
# Backup database first
mysqldump -u root -p soil_analysis_db > backup_before_update.sql

# Pull latest code
git pull origin main

# Update backend dependencies
cd backend
npm install

# Restart application
pm2 restart soil-analysis-api
```

---

## 9. USEFUL COMMANDS

### Database Commands

```sql
-- View all farmers
SELECT * FROM farmers;

-- View all soil tests
SELECT * FROM soil_tests ORDER BY test_date DESC;

-- View recommendations
SELECT * FROM recommendations;

-- Count tests per farmer
SELECT f.name, COUNT(st.test_id) as test_count
FROM farmers f
LEFT JOIN soil_tests st ON f.farmer_id = st.farmer_id
GROUP BY f.farmer_id;

-- Delete test data (for testing)
DELETE FROM recommendations;
DELETE FROM soil_tests;
DELETE FROM farmers WHERE email = 'test@example.com';
```

### Backend Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Check for outdated packages
npm outdated

# Update packages
npm update
```

### Frontend Commands

```bash
# Start http-server
http-server -p 8080

# Start with specific host
http-server -p 8080 -a localhost

# Enable CORS
http-server -p 8080 --cors
```

---

## 10. SUPPORT AND RESOURCES

### Documentation
- Node.js: https://nodejs.org/docs/
- Express.js: https://expressjs.com/
- MySQL: https://dev.mysql.com/doc/
- JWT: https://jwt.io/

### Community
- Stack Overflow
- GitHub Issues
- Node.js Community

---

END OF SETUP GUIDE
