# TESTING DOCUMENTATION
## Soil Analysis and Crop Recommendation System

---

## TABLE OF CONTENTS
1. Testing Overview
2. Black Box Testing
3. White Box Testing
4. Test Results Summary

---

## 1. TESTING OVERVIEW

### Testing Objectives
- Verify system functionality meets requirements
- Ensure data integrity and security
- Validate user interface responsiveness
- Test algorithm accuracy
- Confirm CRUD operations work correctly

### Testing Types Implemented
- **Black Box Testing:** Functional testing without code inspection
- **White Box Testing:** Structural testing with code analysis

### Testing Environment
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL (XAMPP)
- **Browser:** Google Chrome
- **Server:** localhost:3000

---

## 2. BLACK BOX TESTING

### Definition
Black Box Testing focuses on testing the system's functionality without examining internal code structure. Tests are performed from the user's perspective.

---

### 2.1 USER AUTHENTICATION TESTING

#### Test Case 1: Farmer Registration
| Test ID | TC_AUTH_001 |
|---------|-------------|
| **Test Scenario** | Register new farmer account |
| **Input Data** | Name: "John Doe"<br>Email: "john@example.com"<br>Phone: "9876543210"<br>Password: "password123" |
| **Expected Result** | Registration successful, redirect to login |
| **Actual Result** | ✅ PASS - Account created successfully |
| **Status** | PASS |

#### Test Case 2: Farmer Login - Valid Credentials
| Test ID | TC_AUTH_002 |
|---------|-------------|
| **Test Scenario** | Login with correct credentials |
| **Input Data** | Email: "john@example.com"<br>Password: "password123" |
| **Expected Result** | Login successful, redirect to dashboard |
| **Actual Result** | ✅ PASS - User logged in successfully |
| **Status** | PASS |

#### Test Case 3: Farmer Login - Invalid Credentials
| Test ID | TC_AUTH_003 |
|---------|-------------|
| **Test Scenario** | Login with wrong password |
| **Input Data** | Email: "john@example.com"<br>Password: "wrongpassword" |
| **Expected Result** | Error message: "Invalid credentials" |
| **Actual Result** | ✅ PASS - Error displayed correctly |
| **Status** | PASS |

#### Test Case 4: Empty Field Validation
| Test ID | TC_AUTH_004 |
|---------|-------------|
| **Test Scenario** | Submit login form with empty fields |
| **Input Data** | Email: ""<br>Password: "" |
| **Expected Result** | Validation error displayed |
| **Actual Result** | ✅ PASS - "All fields are required" shown |
| **Status** | PASS |

#### Test Case 5: Admin Login
| Test ID | TC_AUTH_005 |
|---------|-------------|
| **Test Scenario** | Admin login with credentials |
| **Input Data** | Email: "admin@soil.com"<br>Password: "admin123" |
| **Expected Result** | Login successful, redirect to admin dashboard |
| **Actual Result** | ✅ PASS - Admin logged in successfully |
| **Status** | PASS |

---

### 2.2 SOIL TEST SUBMISSION TESTING

#### Test Case 6: Valid Soil Test Submission
| Test ID | TC_SOIL_001 |
|---------|-------------|
| **Test Scenario** | Submit soil test with valid data |
| **Input Data** | pH: 6.5<br>Nitrogen: 50<br>Phosphorus: 40<br>Potassium: 60 |
| **Expected Result** | Test submitted, recommendations displayed |
| **Actual Result** | ✅ PASS - Top 5 crops recommended with fertilizer suggestions |
| **Status** | PASS |

#### Test Case 7: Invalid pH Range
| Test ID | TC_SOIL_002 |
|---------|-------------|
| **Test Scenario** | Submit test with pH > 14 |
| **Input Data** | pH: 20<br>Nitrogen: 50<br>Phosphorus: 40<br>Potassium: 60 |
| **Expected Result** | Validation error: "pH must be between 0-14" |
| **Actual Result** | ✅ PASS - Error displayed correctly |
| **Status** | PASS |

#### Test Case 8: Negative NPK Values
| Test ID | TC_SOIL_003 |
|---------|-------------|
| **Test Scenario** | Submit test with negative values |
| **Input Data** | pH: 6.5<br>Nitrogen: -10<br>Phosphorus: 40<br>Potassium: 60 |
| **Expected Result** | Validation error or rejection |
| **Actual Result** | ✅ PASS - HTML5 validation prevents negative input |
| **Status** | PASS |

#### Test Case 9: Empty Fields
| Test ID | TC_SOIL_004 |
|---------|-------------|
| **Test Scenario** | Submit form without filling all fields |
| **Input Data** | pH: 6.5<br>Nitrogen: ""<br>Phosphorus: ""<br>Potassium: "" |
| **Expected Result** | Error: "All fields are required" |
| **Actual Result** | ✅ PASS - Validation error shown |
| **Status** | PASS |

---

### 2.3 CRUD OPERATIONS TESTING (FARMER)

#### Test Case 10: Read - View Test History
| Test ID | TC_CRUD_001 |
|---------|-------------|
| **Test Scenario** | View all previous soil tests |
| **Action** | Navigate to Reports page |
| **Expected Result** | Display all tests with date, pH, NPK values |
| **Actual Result** | ✅ PASS - All tests displayed in table format |
| **Status** | PASS |

#### Test Case 11: Update - Edit Soil Test
| Test ID | TC_CRUD_002 |
|---------|-------------|
| **Test Scenario** | Edit existing soil test |
| **Action** | Click "Edit" button, modify pH from 6.5 to 7.0 |
| **Expected Result** | Test updated, new recommendations generated |
| **Actual Result** | ✅ PASS - Test updated successfully |
| **Status** | PASS |

#### Test Case 12: Delete - Remove Soil Test
| Test ID | TC_CRUD_003 |
|---------|-------------|
| **Test Scenario** | Delete a soil test |
| **Action** | Click "Delete" button, confirm deletion |
| **Expected Result** | Test removed from database and UI |
| **Actual Result** | ✅ PASS - Test deleted successfully |
| **Status** | PASS |

---

### 2.4 ADMIN CRUD OPERATIONS TESTING

#### Test Case 13: Create - Add New Crop
| Test ID | TC_ADMIN_001 |
|---------|-------------|
| **Test Scenario** | Admin adds new crop |
| **Input Data** | Crop: "Tomato"<br>pH: 6.0-7.0<br>N: 120, P: 80, K: 100 |
| **Expected Result** | Crop added to database and displayed in list |
| **Actual Result** | ✅ PASS - Crop added successfully |
| **Status** | PASS |

#### Test Case 14: Update - Edit Crop Details
| Test ID | TC_ADMIN_002 |
|---------|-------------|
| **Test Scenario** | Admin updates crop requirements |
| **Action** | Edit "Wheat" ideal N from 100 to 110 |
| **Expected Result** | Crop requirements updated |
| **Actual Result** | ✅ PASS - Updated successfully |
| **Status** | PASS |

#### Test Case 15: Delete - Remove Crop
| Test ID | TC_ADMIN_003 |
|---------|-------------|
| **Test Scenario** | Admin deletes a crop |
| **Action** | Click "Delete" on "Tomato", confirm |
| **Expected Result** | Crop and its requirements deleted (CASCADE) |
| **Actual Result** | ✅ PASS - Crop removed from system |
| **Status** | PASS |

#### Test Case 16: Create - Add Fertilizer
| Test ID | TC_ADMIN_004 |
|---------|-------------|
| **Test Scenario** | Admin adds new fertilizer |
| **Input Data** | Name: "NPK 15-15-15"<br>N: 15%, P: 15%, K: 15% |
| **Expected Result** | Fertilizer added to database |
| **Actual Result** | ✅ PASS - Fertilizer added successfully |
| **Status** | PASS |

#### Test Case 17: Update - Edit Fertilizer
| Test ID | TC_ADMIN_005 |
|---------|-------------|
| **Test Scenario** | Admin updates fertilizer composition |
| **Action** | Edit "Urea" nitrogen content from 46% to 45% |
| **Expected Result** | Fertilizer updated |
| **Actual Result** | ✅ PASS - Updated successfully |
| **Status** | PASS |

#### Test Case 18: Delete - Remove Fertilizer
| Test ID | TC_ADMIN_006 |
|---------|-------------|
| **Test Scenario** | Admin deletes fertilizer |
| **Action** | Click "Delete" on "NPK 15-15-15" |
| **Expected Result** | Fertilizer removed from database |
| **Actual Result** | ✅ PASS - Deleted successfully |
| **Status** | PASS |

---

### 2.5 NAVIGATION & UI TESTING

#### Test Case 19: Dashboard Navigation
| Test ID | TC_NAV_001 |
|---------|-------------|
| **Test Scenario** | Navigate between pages |
| **Action** | Click Dashboard, Soil Test, Reports, Knowledge Base |
| **Expected Result** | All pages load correctly |
| **Actual Result** | ✅ PASS - Navigation works smoothly |
| **Status** | PASS |

#### Test Case 20: Logout Functionality
| Test ID | TC_NAV_002 |
|---------|-------------|
| **Test Scenario** | User logout |
| **Action** | Click "Logout" button |
| **Expected Result** | Session cleared, redirect to home page |
| **Actual Result** | ✅ PASS - User logged out successfully |
| **Status** | PASS |

#### Test Case 21: Unauthorized Access Prevention
| Test ID | TC_NAV_003 |
|---------|-------------|
| **Test Scenario** | Access dashboard without login |
| **Action** | Open dashboard.html directly |
| **Expected Result** | Redirect to login page |
| **Actual Result** | ✅ PASS - Redirected to login |
| **Status** | PASS |

---

### 2.6 RECOMMENDATION ALGORITHM TESTING

#### Test Case 22: Optimal Soil Conditions
| Test ID | TC_REC_001 |
|---------|-------------|
| **Test Scenario** | Test with ideal conditions for wheat |
| **Input Data** | pH: 6.5<br>N: 100, P: 60, K: 80 |
| **Expected Result** | Wheat appears in top recommendations |
| **Actual Result** | ✅ PASS - Wheat ranked #1 |
| **Status** | PASS |

#### Test Case 23: Low Nitrogen Detection
| Test ID | TC_REC_002 |
|---------|-------------|
| **Test Scenario** | Test with low nitrogen |
| **Input Data** | pH: 6.5<br>N: 20, P: 60, K: 80 |
| **Expected Result** | Nitrogen fertilizer recommended |
| **Actual Result** | ✅ PASS - Urea (46% N) suggested |
| **Status** | PASS |

#### Test Case 24: Multiple Deficiencies
| Test ID | TC_REC_003 |
|---------|-------------|
| **Test Scenario** | Test with low N, P, K |
| **Input Data** | pH: 6.5<br>N: 20, P: 15, K: 25 |
| **Expected Result** | Multiple fertilizers recommended |
| **Actual Result** | ✅ PASS - NPK fertilizers suggested |
| **Status** | PASS |

---

## 3. WHITE BOX TESTING

### Definition
White Box Testing examines the internal structure, code logic, and algorithms of the system.

---

### 3.1 AUTHENTICATION LOGIC TESTING

#### Test Case 25: Password Hashing
| Test ID | TC_WB_001 |
|---------|-------------|
| **Component** | backend/routes/auth.js |
| **Code Tested** | `bcrypt.hash(password, 10)` |
| **Test Method** | Verify password is hashed before storage |
| **Expected Result** | Plain password never stored in database |
| **Actual Result** | ✅ PASS - Bcrypt hashing implemented |
| **Status** | PASS |

**Code Snippet:**
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
await db.query('INSERT INTO farmers (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [name, email, phone, hashedPassword]);
```

#### Test Case 26: JWT Token Generation
| Test ID | TC_WB_002 |
|---------|-------------|
| **Component** | backend/routes/auth.js |
| **Code Tested** | `jwt.sign()` |
| **Test Method** | Verify token contains correct payload |
| **Expected Result** | Token includes farmerId, email, 24h expiry |
| **Actual Result** | ✅ PASS - JWT properly configured |
| **Status** | PASS |

**Code Snippet:**
```javascript
const token = jwt.sign(
    { farmerId: farmer.farmer_id, email: farmer.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);
```

#### Test Case 27: SQL Injection Prevention
| Test ID | TC_WB_003 |
|---------|-------------|
| **Component** | All database queries |
| **Code Tested** | Parameterized queries |
| **Test Method** | Check if queries use `?` placeholders |
| **Expected Result** | All queries use prepared statements |
| **Actual Result** | ✅ PASS - No raw SQL concatenation found |
| **Status** | PASS |

**Code Snippet:**
```javascript
// SECURE - Uses parameterized query
await db.query('SELECT * FROM farmers WHERE email = ?', [email]);

// INSECURE (NOT USED) - Would be vulnerable
// await db.query(`SELECT * FROM farmers WHERE email = '${email}'`);
```

---

### 3.2 RECOMMENDATION ALGORITHM TESTING

#### Test Case 28: pH Range Calculation
| Test ID | TC_WB_004 |
|---------|-------------|
| **Component** | backend/routes/soilTest.js |
| **Code Tested** | pH scoring logic |
| **Test Method** | Verify pH within range gets +100 score |
| **Expected Result** | Correct score calculation |
| **Actual Result** | ✅ PASS - Logic verified |
| **Status** | PASS |

**Code Snippet:**
```javascript
const pHInRange = pH >= crop.ideal_pH_min && pH <= crop.ideal_pH_max;
if (pHInRange) {
    score += 100;
} else {
    const pHDeviation = pH < crop.ideal_pH_min ? 
        crop.ideal_pH_min - pH : pH - crop.ideal_pH_max;
    score -= pHDeviation * 20;
}
```

#### Test Case 29: NPK Deviation Formula
| Test ID | TC_WB_005 |
|---------|-------------|
| **Component** | backend/routes/soilTest.js |
| **Code Tested** | Nutrient deviation calculation |
| **Test Method** | Test `Math.abs(nitrogen - crop.ideal_N)` |
| **Expected Result** | Correct deviation calculated |
| **Actual Result** | ✅ PASS - Formula accurate |
| **Status** | PASS |

**Code Snippet:**
```javascript
const nDeviation = Math.abs(nitrogen - crop.ideal_N);
const pDeviation = Math.abs(phosphorus - crop.ideal_P);
const kDeviation = Math.abs(potassium - crop.ideal_K);

score -= (nDeviation + pDeviation + kDeviation) / 3;
```

#### Test Case 30: Crop Sorting Algorithm
| Test ID | TC_WB_006 |
|---------|-------------|
| **Component** | backend/routes/soilTest.js |
| **Code Tested** | `cropScores.sort((a, b) => b.score - a.score)` |
| **Test Method** | Verify crops sorted by highest score |
| **Expected Result** | Top 5 crops returned in descending order |
| **Actual Result** | ✅ PASS - Sorting works correctly |
| **Status** | PASS |

**Code Snippet:**
```javascript
cropScores.sort((a, b) => b.score - a.score);
const topCrops = cropScores.slice(0, 5);
```

---

### 3.3 FERTILIZER RECOMMENDATION LOGIC

#### Test Case 31: Deficiency Detection
| Test ID | TC_WB_007 |
|---------|-------------|
| **Component** | backend/routes/soilTest.js |
| **Code Tested** | `if (deficiencies.nitrogen < -10)` |
| **Test Method** | Test threshold logic |
| **Expected Result** | Fertilizer suggested when deficiency > 10 |
| **Actual Result** | ✅ PASS - Threshold working |
| **Status** | PASS |

**Code Snippet:**
```javascript
if (deficiencies.nitrogen < -10) {
    const nFerts = fertilizers
        .filter(f => f.nitrogen_content > 20)
        .sort((a, b) => b.nitrogen_content - a.nitrogen_content);
    // Recommend highest N fertilizer
}
```

#### Test Case 32: Fertilizer Amount Calculation
| Test ID | TC_WB_008 |
|---------|-------------|
| **Component** | backend/routes/soilTest.js |
| **Code Tested** | Amount formula |
| **Test Method** | Verify calculation accuracy |
| **Expected Result** | Correct kg/hectare calculated |
| **Actual Result** | ✅ PASS - Formula verified |
| **Status** | PASS |

**Code Snippet:**
```javascript
estimatedAmount: `${Math.ceil(Math.abs(deficiencies.nitrogen) / 
    nFerts[0].nitrogen_content * 100)} kg/hectare`
```

---

### 3.4 DATABASE OPERATIONS TESTING

#### Test Case 33: CASCADE DELETE - Farmers
| Test ID | TC_WB_009 |
|---------|-------------|
| **Component** | database/schema.sql |
| **Code Tested** | `ON DELETE CASCADE` |
| **Test Method** | Delete farmer, check if tests deleted |
| **Expected Result** | All related soil_tests deleted automatically |
| **Actual Result** | ✅ PASS - CASCADE working |
| **Status** | PASS |

**Schema:**
```sql
FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON DELETE CASCADE
```

#### Test Case 34: CASCADE DELETE - Crops
| Test ID | TC_WB_010 |
|---------|-------------|
| **Component** | database/schema.sql |
| **Code Tested** | `ON DELETE CASCADE` |
| **Test Method** | Delete crop, check if requirements deleted |
| **Expected Result** | ideal_requirements deleted automatically |
| **Actual Result** | ✅ PASS - CASCADE working |
| **Status** | PASS |

#### Test Case 35: UNIQUE Constraint
| Test ID | TC_WB_011 |
|---------|-------------|
| **Component** | database/schema.sql |
| **Code Tested** | `email VARCHAR(100) UNIQUE` |
| **Test Method** | Try inserting duplicate email |
| **Expected Result** | Database rejects duplicate |
| **Actual Result** | ✅ PASS - Constraint enforced |
| **Status** | PASS |

---

### 3.5 AUTHORIZATION MIDDLEWARE TESTING

#### Test Case 36: Token Verification
| Test ID | TC_WB_012 |
|---------|-------------|
| **Component** | backend/middleware/auth.js |
| **Code Tested** | `jwt.verify()` |
| **Test Method** | Test with valid/invalid tokens |
| **Expected Result** | Valid token passes, invalid rejected |
| **Actual Result** | ✅ PASS - Middleware working |
| **Status** | PASS |

**Code Snippet:**
```javascript
jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
});
```

#### Test Case 37: Admin Role Check
| Test ID | TC_WB_013 |
|---------|-------------|
| **Component** | backend/routes/admin.js |
| **Code Tested** | `if (!admin.isAdmin)` |
| **Test Method** | Test farmer token on admin route |
| **Expected Result** | Access denied for non-admin |
| **Actual Result** | ✅ PASS - Role check working |
| **Status** | PASS |

---

### 3.6 ERROR HANDLING TESTING

#### Test Case 38: Try-Catch Blocks
| Test ID | TC_WB_014 |
|---------|-------------|
| **Component** | All route handlers |
| **Code Tested** | `try { } catch (error) { }` |
| **Test Method** | Verify all async functions have error handling |
| **Expected Result** | All routes return proper error responses |
| **Actual Result** | ✅ PASS - Error handling implemented |
| **Status** | PASS |

**Code Snippet:**
```javascript
try {
    // Database operation
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
}
```

---

## 4. TEST RESULTS SUMMARY

### Overall Statistics

| Testing Type | Total Tests | Passed | Failed | Pass Rate |
|--------------|-------------|--------|--------|-----------|
| Black Box Testing | 24 | 24 | 0 | 100% |
| White Box Testing | 14 | 14 | 0 | 100% |
| **TOTAL** | **38** | **38** | **0** | **100%** |

---

### Test Coverage by Module

| Module | Tests Conducted | Status |
|--------|-----------------|--------|
| Authentication | 7 | ✅ PASS |
| Soil Test Submission | 4 | ✅ PASS |
| CRUD Operations (Farmer) | 3 | ✅ PASS |
| CRUD Operations (Admin) | 6 | ✅ PASS |
| Navigation & UI | 3 | ✅ PASS |
| Recommendation Algorithm | 6 | ✅ PASS |
| Database Operations | 5 | ✅ PASS |
| Security & Authorization | 4 | ✅ PASS |

---

### Key Findings

#### Strengths
✅ All CRUD operations working correctly  
✅ Authentication and authorization secure  
✅ Recommendation algorithm accurate  
✅ Database constraints properly enforced  
✅ Error handling comprehensive  
✅ SQL injection prevention implemented  
✅ Password hashing with bcrypt  
✅ JWT token-based authentication  

#### Areas of Excellence
- **Security:** Parameterized queries, password hashing, JWT tokens
- **Data Integrity:** CASCADE deletes, UNIQUE constraints, foreign keys
- **Algorithm Accuracy:** Proper scoring and sorting of crop recommendations
- **User Experience:** Smooth navigation, clear error messages

---

### Conclusion

The Soil Analysis and Crop Recommendation System has successfully passed all 38 test cases across both Black Box and White Box testing methodologies. The system demonstrates:

- **Robust functionality** with 100% test pass rate
- **Strong security** with proper authentication and authorization
- **Accurate algorithms** for crop and fertilizer recommendations
- **Reliable database operations** with proper constraints and cascading
- **Excellent code quality** with comprehensive error handling

The system is production-ready and meets all functional and non-functional requirements.

---

**Tested By:** Development Team  
**Test Date:** December 2024  
**Test Environment:** Windows, XAMPP, Node.js, Chrome Browser  
**Status:** ALL TESTS PASSED ✅

---

END OF TESTING DOCUMENTATION
