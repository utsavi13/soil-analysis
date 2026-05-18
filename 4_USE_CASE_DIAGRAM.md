# USE CASE DIAGRAM
## Soil Analysis and Crop Recommendation System

---

## USE CASE DIAGRAM (Textual Representation)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USE CASE DIAGRAM                                │
│              Soil Analysis & Crop Recommendation System                 │
└─────────────────────────────────────────────────────────────────────────┘


                                System Boundary
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │                    ┌──────────────────┐                       │
    │                    │   Register       │                       │
    │              ┌────>│   Account        │                       │
    │              │     └──────────────────┘                       │
    │              │                                                │
    │              │     ┌──────────────────┐                       │
    │              │     │   Login to       │                       │
┌───────┐         ├────>│   System         │                       │
│       │         │     └──────────────────┘                       │
│       │         │              │                                 │
│       │         │              │ <<include>>                     │
│       │         │              ▼                                 │
│       │         │     ┌──────────────────┐                       │
│       │         │     │   Authenticate   │                       │
│       │         │     │   User           │                       │
│       │         │     └──────────────────┘                       │
│       │         │                                                │
│       │         │     ┌──────────────────┐                       │
│       │         │     │   View           │                       │
│FARMER │         ├────>│   Dashboard      │                       │
│       │         │     └──────────────────┘                       │
│       │         │                                                │
│       │         │     ┌──────────────────┐                       │
│       │         │     │   Submit Soil    │                       │
│       │         ├────>│   Test Data      │                       │
│       │         │     └──────────────────┘                       │
│       │         │              │                                 │
│       │         │              │ <<include>>                     │
│       │         │              ▼                                 │
│       │         │     ┌──────────────────┐                       │
│       │         │     │   Validate       │                       │
│       │         │     │   Input Data     │                       │
│       │         │     └──────────────────┘                       │
│       │         │              │                                 │
│       │         │              │ <<extend>>                      │
│       │         │              ▼                                 │
│       │         │     ┌──────────────────┐                       │
│       │         │     │   Generate       │                       │
│       │         │     │   Recommendations│<──────────┐           │
│       │         │     └──────────────────┘           │           │
│       │         │              │                     │           │
│       │         │              │ <<include>>         │           │
│       │         │              ▼                     │           │
│       │         │     ┌──────────────────┐           │           │
│       │         │     │   Calculate Crop │           │           │
│       │         │     │   Suitability    │           │           │
│       │         │     └──────────────────┘           │           │
│       │         │              │                     │           │
│       │         │              │ <<include>>         │           │
│       │         │              ▼                     │           │
│       │         │     ┌──────────────────┐           │           │
│       │         │     │   Suggest        │           │           │
│       │         │     │   Fertilizers    │           │           │
│       │         │     └──────────────────┘           │           │
│       │         │                                    │           │
│       │         │     ┌──────────────────┐           │           │
│       │         │     │   View           │           │           │
│       │         ├────>│   Recommendations│───────────┘           │
│       │         │     └──────────────────┘                       │
│       │         │                                                │
│       │         │     ┌──────────────────┐                       │
│       │         │     │   View Previous  │                       │
│       │         ├────>│   Reports        │                       │
│       │         │     └──────────────────┘                       │
│       │         │                                                │
│       │         │     ┌──────────────────┐                       │
│       │         │     │   Print Report   │                       │
│       │         ├────>│                  │                       │
│       │         │     └──────────────────┘                       │
│       │         │                                                │
│       │         │     ┌──────────────────┐                       │
│       │         │     │   Logout         │                       │
└───────┘         └────>│                  │                       │
                        └──────────────────┘                       │
                                                                   │
                                                                   │
                        ┌──────────────────┐                       │
                        │   Store Data     │                       │
                        │   in Database    │<──────────────────────┤
                        └──────────────────┘                       │
                                 ▲                                 │
                                 │                                 │
                        ┌────────┴────────┐                        │
                        │                 │                        │
                   ┌────────┐      ┌──────────┐                    │
                   │ MySQL  │      │  System  │                    │
                   │Database│      │          │                    │
                   └────────┘      └──────────┘                    │
                                                                   │
    └────────────────────────────────────────────────────────────────┘
```

---

## ACTORS

### Primary Actor: FARMER
**Description:** End user who uses the system to get crop recommendations

**Responsibilities:**
- Register and create account
- Login to access features
- Submit soil test data
- View recommendations
- Access historical reports
- Print reports

### Secondary Actors:

**MySQL Database:**
- Stores all system data
- Provides data persistence
- Ensures data integrity

**System:**
- Processes business logic
- Generates recommendations
- Validates data

---

## USE CASES

### UC-01: Register Account
**Actor:** Farmer
**Precondition:** Farmer has internet access
**Postcondition:** Farmer account created in database

**Main Flow:**
1. Farmer navigates to registration page
2. System displays registration form
3. Farmer enters name, email, phone, password
4. System validates input data
5. System checks if email already exists
6. System hashes password
7. System stores farmer data in database
8. System displays success message

**Alternative Flow:**
- 5a. Email already exists
  - System displays error message
  - Return to step 3

**Exception Flow:**
- Invalid input data
- Database connection error

---

### UC-02: Login to System
**Actor:** Farmer
**Precondition:** Farmer has registered account
**Postcondition:** Farmer authenticated and redirected to dashboard

**Main Flow:**
1. Farmer navigates to login page
2. System displays login form
3. Farmer enters email and password
4. System validates credentials
5. System generates JWT token
6. System returns token to farmer
7. System redirects to dashboard

**Alternative Flow:**
- 4a. Invalid credentials
  - System displays error message
  - Return to step 3

**Include:** Authenticate User

---

### UC-03: View Dashboard
**Actor:** Farmer
**Precondition:** Farmer is logged in
**Postcondition:** Dashboard displayed with options

**Main Flow:**
1. System verifies authentication token
2. System retrieves farmer information
3. System displays dashboard with options:
   - Enter Soil Test
   - View Recommendations
   - Previous Reports

---

### UC-04: Submit Soil Test Data
**Actor:** Farmer
**Precondition:** Farmer is logged in
**Postcondition:** Soil test stored and recommendations generated

**Main Flow:**
1. Farmer navigates to soil test page
2. System displays input form
3. Farmer enters pH, N, P, K values
4. System validates input data
5. System stores test data in database
6. System triggers recommendation generation
7. System displays test ID and success message
8. System redirects to recommendations page

**Alternative Flow:**
- 4a. Invalid input values
  - System displays error message
  - Return to step 3

**Include:** 
- Validate Input Data
- Generate Recommendations

---

### UC-05: Generate Recommendations
**Actor:** System
**Precondition:** Valid soil test data submitted
**Postcondition:** Recommendations stored in database

**Main Flow:**
1. System retrieves soil test data
2. System fetches all crops with ideal requirements
3. System calculates crop suitability scores
4. System ranks crops by score
5. System selects top 5 crops
6. System calculates nutrient deficiencies
7. System fetches fertilizer data
8. System selects appropriate fertilizers
9. System calculates application amounts
10. System stores recommendations
11. System returns recommendations

**Include:**
- Calculate Crop Suitability
- Suggest Fertilizers

---

### UC-06: Calculate Crop Suitability
**Actor:** System
**Precondition:** Soil test data and crop requirements available
**Postcondition:** Suitability scores calculated

**Main Flow:**
1. For each crop:
   a. Check if pH is within range
   b. Calculate NPK deviations
   c. Compute suitability score
2. Return scored crop list

---

### UC-07: Suggest Fertilizers
**Actor:** System
**Precondition:** Nutrient deficiencies calculated
**Postcondition:** Fertilizer recommendations generated

**Main Flow:**
1. Identify deficient nutrients
2. For each deficiency:
   a. Query fertilizers with high content
   b. Select best fertilizer
   c. Calculate application amount
3. Return fertilizer list

---

### UC-08: View Recommendations
**Actor:** Farmer
**Precondition:** Farmer is logged in, test completed
**Postcondition:** Recommendations displayed

**Main Flow:**
1. System retrieves test ID
2. System fetches test data
3. System fetches recommendations
4. System displays:
   - Soil summary
   - Top 5 crops with scores
   - Fertilizer suggestions
   - Application amounts

---

### UC-09: View Previous Reports
**Actor:** Farmer
**Precondition:** Farmer is logged in
**Postcondition:** Historical reports displayed

**Main Flow:**
1. System retrieves farmer ID
2. System queries all tests for farmer
3. System displays list of reports with:
   - Test date
   - Soil parameters
   - Test ID
4. Farmer can click to view full recommendations

---

### UC-10: Print Report
**Actor:** Farmer
**Precondition:** Viewing recommendations
**Postcondition:** Report printed or saved as PDF

**Main Flow:**
1. Farmer clicks print button
2. System formats page for printing
3. System opens print dialog
4. Farmer prints or saves as PDF

---

### UC-11: Logout
**Actor:** Farmer
**Precondition:** Farmer is logged in
**Postcondition:** Session terminated

**Main Flow:**
1. Farmer clicks logout button
2. System clears authentication token
3. System clears local storage
4. System redirects to home page

---

## USE CASE RELATIONSHIPS

### Include Relationships
- Login → Authenticate User
- Submit Soil Test → Validate Input Data
- Submit Soil Test → Generate Recommendations
- Generate Recommendations → Calculate Crop Suitability
- Generate Recommendations → Suggest Fertilizers

### Extend Relationships
- Validate Input Data → Generate Recommendations (on success)

### Generalization
- None in this system

---

## USE CASE PRIORITIES

### High Priority (Must Have)
- Register Account
- Login to System
- Submit Soil Test Data
- Generate Recommendations
- View Recommendations

### Medium Priority (Should Have)
- View Dashboard
- View Previous Reports
- Authenticate User
- Validate Input Data

### Low Priority (Nice to Have)
- Print Report
- Logout

---

## SYSTEM FEATURES SUMMARY

**User Management:**
- Registration
- Authentication
- Session management

**Soil Testing:**
- Data input
- Validation
- Storage

**Recommendation Engine:**
- Crop suitability calculation
- Fertilizer suggestion
- Amount estimation

**Reporting:**
- Current recommendations
- Historical reports
- Print functionality

---

END OF USE CASE DIAGRAM DOCUMENTATION
