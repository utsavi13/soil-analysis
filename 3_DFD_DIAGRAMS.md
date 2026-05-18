# DATA FLOW DIAGRAMS (DFD)
## Soil Analysis and Crop Recommendation System

---

## DFD LEVEL 0 (CONTEXT DIAGRAM)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CONTEXT DIAGRAM                             │
└─────────────────────────────────────────────────────────────────────┘

                    Registration Data
                    Login Credentials
                    Soil Test Data
                           │
                           ▼
    ┌──────────┐    ┌─────────────────────┐    ┌──────────────┐
    │          │───>│                     │───>│              │
    │  FARMER  │    │  SOIL ANALYSIS &    │    │   DATABASE   │
    │          │<───│  CROP RECOMMENDATION│<───│              │
    └──────────┘    │      SYSTEM         │    └──────────────┘
                    └─────────────────────┘
                           │
                           ▼
                    Crop Recommendations
                    Fertilizer Suggestions
                    Test Reports


External Entity: FARMER
Process: SOIL ANALYSIS & CROP RECOMMENDATION SYSTEM
Data Store: DATABASE

Input Flows:
- Registration data (name, email, phone, password)
- Login credentials (email, password)
- Soil test data (pH, N, P, K)

Output Flows:
- Authentication token
- Crop recommendations (top 5 crops)
- Fertilizer suggestions
- Historical test reports
```

---

## DFD LEVEL 1 (MAJOR PROCESSES)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LEVEL 1 DFD                                 │
└─────────────────────────────────────────────────────────────────────┘

                Registration Data
                       │
    ┌──────────┐      ▼
    │          │  ┌────────────────┐
    │          │  │   1.0          │    User Data
    │          │  │ AUTHENTICATE   │──────────────┐
    │          │  │    USER        │              │
    │          │  └────────────────┘              ▼
    │          │      │                    ┌──────────────┐
    │          │      │ Auth Token         │  D1: FARMERS │
    │          │      ▼                    └──────────────┘
    │          │  Login Success
    │          │      │
    │  FARMER  │      │ Soil Test Data
    │          │      ▼
    │          │  ┌────────────────┐
    │          │  │   2.0          │    Test Data
    │          │  │  PROCESS SOIL  │──────────────┐
    │          │  │     TEST       │              │
    │          │  └────────────────┘              ▼
    │          │      │                    ┌──────────────┐
    │          │      │ Test ID            │ D2: SOIL_    │
    │          │      ▼                    │     TESTS    │
    │          │  ┌────────────────┐      └──────────────┘
    │          │  │   3.0          │              │
    │          │  │  GENERATE      │<─────────────┘
    │          │  │ RECOMMENDATIONS│      Test Data
    │          │  └────────────────┘
    │          │      │    │                      │
    │          │      │    └──────────────────────┼────┐
    │          │      │                           │    │
    │          │      │ Crop Data          Fert Data  │
    │          │      ▼                           ▼    │
    │          │  ┌──────────────┐      ┌──────────────┐
    │          │  │ D3: CROPS &  │      │ D4: FERTI-   │
    │          │  │    IDEAL_REQ │      │    LIZERS    │
    │          │  └──────────────┘      └──────────────┘
    │          │      │                           │
    │          │      └───────────┬───────────────┘
    │          │                  │
    │          │                  ▼
    │          │          Recommendations
    │          │                  │
    │          │                  ▼
    │          │          ┌──────────────┐
    │          │          │ D5: RECOM-   │
    │          │          │   MENDATIONS │
    │          │          └──────────────┘
    │          │                  │
    │          │<─────────────────┘
    └──────────┘      Results Display


PROCESSES:
1.0 - Authenticate User
2.0 - Process Soil Test
3.0 - Generate Recommendations

DATA STORES:
D1 - FARMERS
D2 - SOIL_TESTS
D3 - CROPS & IDEAL_REQUIREMENTS
D4 - FERTILIZERS
D5 - RECOMMENDATIONS
```

---

## DFD LEVEL 2 (DETAILED PROCESSES)

### Level 2 DFD - Process 1.0: AUTHENTICATE USER

```
┌─────────────────────────────────────────────────────────────────────┐
│              LEVEL 2 DFD - AUTHENTICATE USER (1.0)                  │
└─────────────────────────────────────────────────────────────────────┘

                Registration Data
                       │
    ┌──────────┐      ▼
    │          │  ┌────────────────┐
    │          │  │   1.1          │
    │          │  │   VALIDATE     │
    │          │  │   INPUT DATA   │
    │          │  └────────────────┘
    │          │      │
    │          │      │ Validated Data
    │          │      ▼
    │          │  ┌────────────────┐
    │          │  │   1.2          │    Check Email
    │  FARMER  │  │   CHECK        │──────────────┐
    │          │  │   EXISTING     │              │
    │          │  │   USER         │              ▼
    │          │  └────────────────┘      ┌──────────────┐
    │          │      │                    │  D1: FARMERS │
    │          │      │ New User           └──────────────┘
    │          │      ▼                            │
    │          │  ┌────────────────┐              │
    │          │  │   1.3          │              │
    │          │  │   HASH         │              │
    │          │  │   PASSWORD     │              │
    │          │  └────────────────┘              │
    │          │      │                            │
    │          │      │ Hashed Password            │
    │          │      ▼                            │
    │          │  ┌────────────────┐              │
    │          │  │   1.4          │    Store     │
    │          │  │   STORE USER   │──────────────┘
    │          │  │   DATA         │
    │          │  └────────────────┘
    │          │      │
    │          │<─────┘
    └──────────┘  Success Message


    Login Credentials
           │
           ▼
    ┌────────────────┐
    │   1.5          │    Query User
    │   VERIFY       │──────────────┐
    │   CREDENTIALS  │              │
    └────────────────┘              ▼
           │                 ┌──────────────┐
           │                 │  D1: FARMERS │
           │                 └──────────────┘
           │ Valid User              │
           ▼                         │
    ┌────────────────┐              │
    │   1.6          │<─────────────┘
    │   GENERATE     │    User Data
    │   JWT TOKEN    │
    └────────────────┘
           │
           ▼
      Auth Token
```

**Sub-processes:**
- 1.1: Validate Input Data
- 1.2: Check Existing User
- 1.3: Hash Password
- 1.4: Store User Data
- 1.5: Verify Credentials
- 1.6: Generate JWT Token

---

### Level 2 DFD - Process 2.0: PROCESS SOIL TEST

```
┌─────────────────────────────────────────────────────────────────────┐
│              LEVEL 2 DFD - PROCESS SOIL TEST (2.0)                  │
└─────────────────────────────────────────────────────────────────────┘

                Soil Test Data
                (pH, N, P, K)
                       │
    ┌──────────┐      ▼
    │          │  ┌────────────────┐
    │          │  │   2.1          │
    │          │  │   VERIFY       │
    │          │  │   AUTH TOKEN   │
    │          │  └────────────────┘
    │          │      │
    │          │      │ Authenticated
    │          │      ▼
    │          │  ┌────────────────┐
    │  FARMER  │  │   2.2          │
    │          │  │   VALIDATE     │
    │          │  │   SOIL DATA    │
    │          │  └────────────────┘
    │          │      │
    │          │      │ Valid Data
    │          │      ▼
    │          │  ┌────────────────┐
    │          │  │   2.3          │    Store Test
    │          │  │   STORE SOIL   │──────────────┐
    │          │  │   TEST DATA    │              │
    │          │  └────────────────┘              ▼
    │          │      │                    ┌──────────────┐
    │          │      │ Test ID            │ D2: SOIL_    │
    │          │      ▼                    │     TESTS    │
    │          │  ┌────────────────┐      └──────────────┘
    │          │  │   2.4          │
    │          │  │   TRIGGER      │
    │          │  │   RECOMMENDATION│
    │          │  │   PROCESS      │
    │          │  └────────────────┘
    │          │      │
    │          │<─────┘
    └──────────┘  Test ID & Status
```

**Sub-processes:**
- 2.1: Verify Auth Token
- 2.2: Validate Soil Data
- 2.3: Store Soil Test Data
- 2.4: Trigger Recommendation Process

---

### Level 2 DFD - Process 3.0: GENERATE RECOMMENDATIONS

```
┌─────────────────────────────────────────────────────────────────────┐
│           LEVEL 2 DFD - GENERATE RECOMMENDATIONS (3.0)              │
└─────────────────────────────────────────────────────────────────────┘

                Test ID
                   │
                   ▼
            ┌────────────────┐      Retrieve Test
            │   3.1          │──────────────┐
            │   RETRIEVE     │              │
            │   TEST DATA    │              ▼
            └────────────────┘      ┌──────────────┐
                   │                │ D2: SOIL_    │
                   │                │     TESTS    │
                   │                └──────────────┘
                   │ Test Data
                   ▼
            ┌────────────────┐      Retrieve Crops
            │   3.2          │──────────────┐
            │   FETCH ALL    │              │
            │   CROPS &      │              ▼
            │   REQUIREMENTS │      ┌──────────────┐
            └────────────────┘      │ D3: CROPS &  │
                   │                │    IDEAL_REQ │
                   │                └──────────────┘
                   │ Crop Data
                   ▼
            ┌────────────────┐
            │   3.3          │
            │   CALCULATE    │
            │   CROP         │
            │   SUITABILITY  │
            └────────────────┘
                   │
                   │ Scores
                   ▼
            ┌────────────────┐
            │   3.4          │
            │   RANK & SELECT│
            │   TOP 5 CROPS  │
            └────────────────┘
                   │
                   │ Top Crops
                   ▼
            ┌────────────────┐      Retrieve Ferts
            │   3.5          │──────────────┐
            │   CALCULATE    │              │
            │   NUTRIENT     │              ▼
            │   DEFICIENCIES │      ┌──────────────┐
            └────────────────┘      │ D4: FERTI-   │
                   │                │    LIZERS    │
                   │                └──────────────┘
                   │ Deficiencies
                   ▼
            ┌────────────────┐
            │   3.6          │
            │   SELECT       │
            │   APPROPRIATE  │
            │   FERTILIZERS  │
            └────────────────┘
                   │
                   │ Fertilizer List
                   ▼
            ┌────────────────┐
            │   3.7          │
            │   CALCULATE    │
            │   APPLICATION  │
            │   AMOUNTS      │
            └────────────────┘
                   │
                   │ Complete Recommendations
                   ▼
            ┌────────────────┐      Store
            │   3.8          │──────────────┐
            │   STORE        │              │
            │   RECOMMENDATIONS              ▼
            └────────────────┘      ┌──────────────┐
                   │                │ D5: RECOM-   │
                   │                │   MENDATIONS │
                   │                └──────────────┘
                   ▼
            Recommendations
            (Crops + Fertilizers)
```

**Sub-processes:**
- 3.1: Retrieve Test Data
- 3.2: Fetch All Crops & Requirements
- 3.3: Calculate Crop Suitability
- 3.4: Rank & Select Top 5 Crops
- 3.5: Calculate Nutrient Deficiencies
- 3.6: Select Appropriate Fertilizers
- 3.7: Calculate Application Amounts
- 3.8: Store Recommendations

---

## DATA FLOW DESCRIPTIONS

### Input Data Flows

**Registration Data:**
- Source: Farmer
- Destination: Process 1.1
- Content: name, email, phone, password

**Login Credentials:**
- Source: Farmer
- Destination: Process 1.5
- Content: email, password

**Soil Test Data:**
- Source: Farmer
- Destination: Process 2.1
- Content: pH, nitrogen, phosphorus, potassium, auth_token

### Output Data Flows

**Authentication Token:**
- Source: Process 1.6
- Destination: Farmer
- Content: JWT token, user info

**Crop Recommendations:**
- Source: Process 3.8
- Destination: Farmer
- Content: Top 5 crops with scores and ideal requirements

**Fertilizer Suggestions:**
- Source: Process 3.8
- Destination: Farmer
- Content: Fertilizer names, compositions, amounts

**Test Reports:**
- Source: Data Store D2, D5
- Destination: Farmer
- Content: Historical test data with recommendations

---

## DATA STORE DESCRIPTIONS

**D1: FARMERS**
- Contains: User registration and authentication data
- Access: Read/Write by authentication processes

**D2: SOIL_TESTS**
- Contains: Soil test submissions with NPK values
- Access: Write by Process 2.3, Read by Process 3.1

**D3: CROPS & IDEAL_REQUIREMENTS**
- Contains: Crop master data and ideal growing conditions
- Access: Read-only by Process 3.2

**D4: FERTILIZERS**
- Contains: Fertilizer master data with NPK compositions
- Access: Read-only by Process 3.6

**D5: RECOMMENDATIONS**
- Contains: Generated recommendations for each test
- Access: Write by Process 3.8, Read for reports

---

END OF DFD DOCUMENTATION
