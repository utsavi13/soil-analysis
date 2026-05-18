# DETAILED DATABASE SCHEMA DOCUMENTATION
## Soil Analysis and Crop Recommendation System

---

## DATABASE OVERVIEW

**Database Name:** `soil_analysis_db`  
**Database Type:** MySQL (Relational Database Management System)  
**Total Tables:** 7  
**Normalization Level:** Third Normal Form (3NF)  
**Character Set:** UTF-8  
**Storage Engine:** InnoDB (supports transactions and foreign keys)

---

## TABLE 1: FARMERS

### Purpose
Stores registered farmer user accounts with authentication credentials and contact information.

### Table Structure

```sql
CREATE TABLE farmers (
    farmer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Column Details

| Column Name | Data Type | Size | Constraints | Description |
|-------------|-----------|------|-------------|-------------|
| **farmer_id** | INT | - | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each farmer |
| **name** | VARCHAR | 100 | NOT NULL | Full name of the farmer |
| **email** | VARCHAR | 100 | UNIQUE, NOT NULL | Email address (used for login) |
| **phone** | VARCHAR | 15 | - | Contact phone number |
| **password** | VARCHAR | 255 | NOT NULL | Bcrypt hashed password |
| **created_at** | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Account creation date/time |

### Keys and Indexes

**Primary Key:**
- `farmer_id` - Uniquely identifies each farmer record

**Unique Key:**
- `email` - Ensures no duplicate email addresses

**Indexes:**
- `idx_farmer_email` - Speeds up login queries by email

### Relationships

**One-to-Many with soil_tests:**
- One farmer can have multiple soil tests
- Foreign key: `soil_tests.farmer_id` references `farmers.farmer_id`
- On Delete: CASCADE (deleting farmer removes all their tests)

### Sample Data

| farmer_id | name | email | phone | password | created_at |
|-----------|------|-------|-------|----------|------------|
| 1 | John Doe | john@example.com | 9876543210 | $2b$10$hash... | 2024-12-01 10:30:00 |
| 2 | Jane Smith | jane@example.com | 9876543211 | $2b$10$hash... | 2024-12-01 11:15:00 |

### Business Rules

1. Email must be unique across all farmers
2. Password must be hashed using bcrypt (never stored as plain text)
3. Name and email are mandatory fields
4. Phone number is optional
5. Created_at automatically set on registration

---


## TABLE 2: SOIL_TESTS

### Purpose
Stores soil analysis data submitted by farmers including pH level and NPK (Nitrogen, Phosphorus, Potassium) values.

### Table Structure

```sql
CREATE TABLE soil_tests (
    test_id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT NOT NULL,
    pH DECIMAL(4,2) NOT NULL,
    nitrogen DECIMAL(6,2) NOT NULL,
    phosphorus DECIMAL(6,2) NOT NULL,
    potassium DECIMAL(6,2) NOT NULL,
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON DELETE CASCADE
);
```

### Column Details

| Column Name | Data Type | Size | Constraints | Description |
|-------------|-----------|------|-------------|-------------|
| **test_id** | INT | - | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each test |
| **farmer_id** | INT | - | FOREIGN KEY, NOT NULL | References farmers table |
| **pH** | DECIMAL | (4,2) | NOT NULL | Soil pH level (0.00 to 14.00) |
| **nitrogen** | DECIMAL | (6,2) | NOT NULL | Nitrogen content in kg/hectare |
| **phosphorus** | DECIMAL | (6,2) | NOT NULL | Phosphorus content in kg/hectare |
| **potassium** | DECIMAL | (6,2) | NOT NULL | Potassium content in kg/hectare |
| **test_date** | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Date and time of test submission |

### Keys and Indexes

**Primary Key:**
- `test_id` - Uniquely identifies each soil test

**Foreign Key:**
- `farmer_id` - References `farmers(farmer_id)`
  - ON DELETE CASCADE: Deleting farmer removes all their tests
  - ON UPDATE CASCADE: Updates propagate automatically

**Indexes:**
- `idx_soil_test_farmer` - Speeds up queries filtering by farmer_id
- `idx_test_date` - Enables fast chronological sorting

### Relationships

**Many-to-One with farmers:**
- Multiple tests belong to one farmer
- Foreign key: `farmer_id` references `farmers.farmer_id`

**One-to-One with recommendations:**
- Each test generates one recommendation
- Foreign key in recommendations table: `test_id`

### Sample Data

| test_id | farmer_id | pH | nitrogen | phosphorus | potassium | test_date |
|---------|-----------|-----|----------|------------|-----------|-----------|
| 1 | 1 | 6.50 | 50.00 | 40.00 | 60.00 | 2024-12-01 14:30:00 |
| 2 | 1 | 7.00 | 80.00 | 55.00 | 70.00 | 2024-12-02 09:15:00 |
| 3 | 2 | 5.80 | 45.00 | 35.00 | 50.00 | 2024-12-02 11:00:00 |

### Business Rules

1. pH value must be between 0 and 14 (validated at application level)
2. NPK values must be positive numbers
3. Each test must be associated with a valid farmer
4. Test date automatically recorded on submission
5. Deleting a farmer cascades to delete all their tests
6. DECIMAL(4,2) allows values like 6.50, 12.75
7. DECIMAL(6,2) allows values like 1234.56 kg/hectare

### Data Validation

- **pH Range:** 0.00 - 14.00 (acidic to alkaline)
- **Nitrogen:** 0.00 - 9999.99 kg/hectare
- **Phosphorus:** 0.00 - 9999.99 kg/hectare
- **Potassium:** 0.00 - 9999.99 kg/hectare

---


## TABLE 3: CROPS

### Purpose
Master table storing all available crop types in the system. Acts as a reference table for crop recommendations.

### Table Structure

```sql
CREATE TABLE crops (
    crop_id INT AUTO_INCREMENT PRIMARY KEY,
    crop_name VARCHAR(50) NOT NULL UNIQUE
);
```

### Column Details

| Column Name | Data Type | Size | Constraints | Description |
|-------------|-----------|------|-------------|-------------|
| **crop_id** | INT | - | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each crop |
| **crop_name** | VARCHAR | 50 | UNIQUE, NOT NULL | Name of the crop (e.g., Wheat, Rice) |

### Keys and Indexes

**Primary Key:**
- `crop_id` - Uniquely identifies each crop

**Unique Key:**
- `crop_name` - Ensures no duplicate crop names

### Relationships

**One-to-One with ideal_requirements:**
- Each crop has one set of ideal soil requirements
- Foreign key in ideal_requirements: `crop_id`
- On Delete: CASCADE (deleting crop removes its requirements)

**Referenced by recommendations:**
- Crop recommendations reference this table
- Used in recommendation algorithm

### Sample Data

| crop_id | crop_name |
|---------|-----------|
| 1 | Wheat |
| 2 | Rice |
| 3 | Corn |
| 4 | Cotton |
| 5 | Sugarcane |
| 6 | Potato |
| 7 | Tomato |
| 8 | Soybean |

### Business Rules

1. Crop name must be unique
2. Crop name cannot be empty
3. Crop names are case-sensitive
4. Each crop must have corresponding ideal_requirements
5. Deleting a crop cascades to delete its ideal requirements

---


## TABLE 4: IDEAL_REQUIREMENTS

### Purpose
Stores the ideal soil conditions required for optimal growth of each crop. Used by the recommendation algorithm to match soil test results with suitable crops.

### Table Structure

```sql
CREATE TABLE ideal_requirements (
    ideal_id INT AUTO_INCREMENT PRIMARY KEY,
    crop_id INT NOT NULL,
    ideal_pH_min DECIMAL(4,2) NOT NULL,
    ideal_pH_max DECIMAL(4,2) NOT NULL,
    ideal_N DECIMAL(6,2) NOT NULL,
    ideal_P DECIMAL(6,2) NOT NULL,
    ideal_K DECIMAL(6,2) NOT NULL,
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE
);
```

### Column Details

| Column Name | Data Type | Size | Constraints | Description |
|-------------|-----------|------|-------------|-------------|
| **ideal_id** | INT | - | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each requirement set |
| **crop_id** | INT | - | FOREIGN KEY, NOT NULL | References crops table |
| **ideal_pH_min** | DECIMAL | (4,2) | NOT NULL | Minimum pH level for crop |
| **ideal_pH_max** | DECIMAL | (4,2) | NOT NULL | Maximum pH level for crop |
| **ideal_N** | DECIMAL | (6,2) | NOT NULL | Ideal nitrogen level (kg/hectare) |
| **ideal_P** | DECIMAL | (6,2) | NOT NULL | Ideal phosphorus level (kg/hectare) |
| **ideal_K** | DECIMAL | (6,2) | NOT NULL | Ideal potassium level (kg/hectare) |

### Keys and Indexes

**Primary Key:**
- `ideal_id` - Uniquely identifies each requirement record

**Foreign Key:**
- `crop_id` - References `crops(crop_id)`
  - ON DELETE CASCADE: Deleting crop removes its requirements
  - ON UPDATE CASCADE: Updates propagate automatically

### Relationships

**One-to-One with crops:**
- Each crop has exactly one set of ideal requirements
- Foreign key: `crop_id` references `crops.crop_id`

### Sample Data

| ideal_id | crop_id | ideal_pH_min | ideal_pH_max | ideal_N | ideal_P | ideal_K |
|----------|---------|--------------|--------------|---------|---------|---------|
| 1 | 1 (Wheat) | 6.00 | 7.50 | 100.00 | 60.00 | 80.00 |
| 2 | 2 (Rice) | 5.50 | 6.50 | 120.00 | 50.00 | 70.00 |
| 3 | 3 (Corn) | 5.80 | 7.00 | 150.00 | 70.00 | 90.00 |
| 4 | 4 (Cotton) | 6.00 | 7.50 | 100.00 | 50.00 | 80.00 |
| 5 | 5 (Sugarcane) | 6.00 | 7.50 | 200.00 | 80.00 | 150.00 |
| 6 | 6 (Potato) | 5.00 | 6.50 | 120.00 | 80.00 | 150.00 |
| 7 | 7 (Tomato) | 6.00 | 7.00 | 120.00 | 80.00 | 100.00 |
| 8 | 8 (Soybean) | 6.00 | 7.00 | 80.00 | 40.00 | 60.00 |

### Business Rules

1. Each crop must have exactly one set of ideal requirements
2. pH_min must be less than pH_max
3. All NPK values must be positive
4. Requirements are based on agricultural research data
5. Used by recommendation algorithm to calculate crop suitability scores

### Algorithm Usage

The recommendation algorithm uses these values to:
1. Check if soil pH falls within ideal range (pH_min to pH_max)
2. Calculate deviation between actual and ideal NPK values
3. Assign scores to crops based on how well soil matches requirements
4. Rank crops from most suitable to least suitable

**Scoring Formula:**
```
score = 100 (if pH in range) - pH_deviation * 20 - average(N_dev, P_dev, K_dev)
```

---


## TABLE 5: FERTILIZERS

### Purpose
Master table storing available fertilizer products with their NPK composition percentages. Used for generating fertilizer recommendations based on soil deficiencies.

### Table Structure

```sql
CREATE TABLE fertilizers (
    fert_id INT AUTO_INCREMENT PRIMARY KEY,
    fert_name VARCHAR(100) NOT NULL,
    nitrogen_content DECIMAL(5,2) NOT NULL,
    phosphorus_content DECIMAL(5,2) NOT NULL,
    potassium_content DECIMAL(5,2) NOT NULL
);
```

### Column Details

| Column Name | Data Type | Size | Constraints | Description |
|-------------|-----------|------|-------------|-------------|
| **fert_id** | INT | - | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each fertilizer |
| **fert_name** | VARCHAR | 100 | NOT NULL | Commercial name of fertilizer |
| **nitrogen_content** | DECIMAL | (5,2) | NOT NULL | Percentage of nitrogen (N) content |
| **phosphorus_content** | DECIMAL | (5,2) | NOT NULL | Percentage of phosphorus (P) content |
| **potassium_content** | DECIMAL | (5,2) | NOT NULL | Percentage of potassium (K) content |

### Keys and Indexes

**Primary Key:**
- `fert_id` - Uniquely identifies each fertilizer product

### Relationships

**Referenced by recommendations:**
- Used in fertilizer recommendation algorithm
- No direct foreign key relationship (lookup table)

### Sample Data

| fert_id | fert_name | nitrogen_content | phosphorus_content | potassium_content |
|---------|-----------|------------------|--------------------|--------------------|
| 1 | Urea | 46.00 | 0.00 | 0.00 |
| 2 | DAP (Diammonium Phosphate) | 18.00 | 46.00 | 0.00 |
| 3 | MOP (Muriate of Potash) | 0.00 | 0.00 | 60.00 |
| 4 | NPK 20-20-20 | 20.00 | 20.00 | 20.00 |
| 5 | NPK 10-26-26 | 10.00 | 26.00 | 26.00 |
| 6 | Ammonium Sulfate | 21.00 | 0.00 | 0.00 |
| 7 | Single Super Phosphate | 0.00 | 16.00 | 0.00 |
| 8 | NPK 15-15-15 | 15.00 | 15.00 | 15.00 |

### Business Rules

1. Fertilizer name must be unique
2. NPK percentages must be between 0 and 100
3. At least one nutrient content must be greater than 0
4. Content values represent percentage by weight
5. Used to recommend specific fertilizers based on soil deficiencies

### Fertilizer Types

**Single Nutrient Fertilizers:**
- High in one nutrient (e.g., Urea for Nitrogen)
- Used when specific deficiency detected

**Balanced Fertilizers:**
- Equal NPK ratios (e.g., 20-20-20)
- Used for maintenance when no major deficiency

**Compound Fertilizers:**
- Multiple nutrients in specific ratios
- Used for targeted nutrient management

### Algorithm Usage

The fertilizer recommendation algorithm:
1. Detects nutrient deficiencies (N, P, or K < -10 kg/hectare)
2. Filters fertilizers with high content of deficient nutrient
3. Selects fertilizer with highest percentage of needed nutrient
4. Calculates required amount based on deficiency and fertilizer strength

**Amount Calculation Formula:**
```
Amount (kg/hectare) = (Deficiency / Fertilizer_Content) * 100
```

**Example:**
- Nitrogen deficiency: 50 kg/hectare
- Urea nitrogen content: 46%
- Required amount: (50 / 46) * 100 = 109 kg/hectare

---


## TABLE 6: RECOMMENDATIONS

### Purpose
Stores generated crop and fertilizer recommendations for each soil test. Links test results with suggested crops and fertilizers in JSON format.

### Table Structure

```sql
CREATE TABLE recommendations (
    rec_id INT AUTO_INCREMENT PRIMARY KEY,
    test_id INT NOT NULL,
    recommended_crops TEXT,
    fertilizer_suggestions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES soil_tests(test_id) ON DELETE CASCADE
);
```

### Column Details

| Column Name | Data Type | Size | Constraints | Description |
|-------------|-----------|------|-------------|-------------|
| **rec_id** | INT | - | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each recommendation |
| **test_id** | INT | - | FOREIGN KEY, NOT NULL | References soil_tests table |
| **recommended_crops** | TEXT | 65,535 chars | - | JSON array of recommended crops with scores |
| **fertilizer_suggestions** | TEXT | 65,535 chars | - | JSON array of fertilizer recommendations |
| **created_at** | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Recommendation generation timestamp |

### Keys and Indexes

**Primary Key:**
- `rec_id` - Uniquely identifies each recommendation record

**Foreign Key:**
- `test_id` - References `soil_tests(test_id)`
  - ON DELETE CASCADE: Deleting test removes its recommendations
  - ON UPDATE CASCADE: Updates propagate automatically

### Relationships

**One-to-One with soil_tests:**
- Each soil test has exactly one recommendation
- Foreign key: `test_id` references `soil_tests.test_id`

### Sample Data Structure

**recommended_crops (JSON format):**
```json
[
  {
    "cropId": 1,
    "cropName": "Wheat",
    "score": 95.5,
    "deviations": {
      "nitrogen": -10.0,
      "phosphorus": 5.0,
      "potassium": -5.0
    },
    "idealRequirements": {
      "pH": "6.0-7.5",
      "N": 100,
      "P": 60,
      "K": 80
    }
  },
  {
    "cropId": 3,
    "cropName": "Corn",
    "score": 88.2,
    "deviations": {
      "nitrogen": -50.0,
      "phosphorus": -10.0,
      "potassium": -15.0
    },
    "idealRequirements": {
      "pH": "5.8-7.0",
      "N": 150,
      "P": 70,
      "K": 90
    }
  }
]
```

**fertilizer_suggestions (JSON format):**
```json
[
  {
    "nutrient": "Nitrogen",
    "deficiency": "10.00",
    "status": "Low",
    "fertilizer": "Urea",
    "composition": "46% N",
    "estimatedAmount": "22 kg/hectare"
  },
  {
    "nutrient": "Potassium",
    "deficiency": "5.00",
    "status": "Low",
    "fertilizer": "MOP (Muriate of Potash)",
    "composition": "60% K",
    "estimatedAmount": "9 kg/hectare"
  }
]
```

### Sample Table Data

| rec_id | test_id | recommended_crops | fertilizer_suggestions | created_at |
|--------|---------|-------------------|------------------------|------------|
| 1 | 1 | [JSON array of 5 crops] | [JSON array of fertilizers] | 2024-12-01 14:30:05 |
| 2 | 2 | [JSON array of 5 crops] | [JSON array of fertilizers] | 2024-12-02 09:15:12 |

### Business Rules

1. Each soil test must have exactly one recommendation
2. Recommendations are generated automatically after test submission
3. Recommended_crops contains top 5 suitable crops ranked by score
4. Fertilizer_suggestions contains 1-3 fertilizers based on deficiencies
5. JSON format allows flexible storage of complex data structures
6. Recommendations are regenerated when test is updated
7. Old recommendations are deleted before creating new ones

### JSON Data Structure Details

**Crop Recommendation Fields:**
- `cropId`: Database ID of the crop
- `cropName`: Display name of the crop
- `score`: Suitability score (higher = better match)
- `deviations`: Difference between actual and ideal NPK values
  - Negative = deficiency
  - Positive = excess
- `idealRequirements`: Optimal conditions for the crop

**Fertilizer Suggestion Fields:**
- `nutrient`: Which nutrient is deficient (N, P, K, or Balanced)
- `deficiency`: Amount of deficiency in kg/hectare
- `status`: "Low" or "Normal"
- `fertilizer`: Recommended fertilizer product name
- `composition`: NPK percentage in the fertilizer
- `estimatedAmount`: Calculated application rate

### Algorithm Logic

**Crop Recommendation Process:**
1. Fetch all crops with ideal requirements
2. Calculate suitability score for each crop
3. Sort crops by score (descending)
4. Select top 5 crops
5. Store as JSON in recommended_crops

**Fertilizer Recommendation Process:**
1. Identify nutrient deficiencies from best crop match
2. Filter fertilizers with high content of deficient nutrient
3. Calculate required amount based on deficiency
4. Store as JSON in fertilizer_suggestions

---


## TABLE 7: ADMINS

### Purpose
Stores administrator user accounts with elevated privileges for managing crops and fertilizers in the system.

### Table Structure

```sql
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Column Details

| Column Name | Data Type | Size | Constraints | Description |
|-------------|-----------|------|-------------|-------------|
| **admin_id** | INT | - | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each admin |
| **username** | VARCHAR | 50 | UNIQUE, NOT NULL | Admin username for display |
| **email** | VARCHAR | 100 | UNIQUE, NOT NULL | Admin email (used for login) |
| **password** | VARCHAR | 255 | NOT NULL | Bcrypt hashed password |
| **created_at** | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |

### Keys and Indexes

**Primary Key:**
- `admin_id` - Uniquely identifies each admin

**Unique Keys:**
- `username` - Ensures unique usernames
- `email` - Ensures unique email addresses

### Relationships

**No direct foreign key relationships:**
- Admins operate independently from farmers
- Separate authentication system
- Manage system-wide data (crops, fertilizers)

### Sample Data

| admin_id | username | email | password | created_at |
|----------|----------|-------|----------|------------|
| 1 | admin | admin@soil.com | $2b$10$hash... | 2024-12-01 08:00:00 |
| 2 | superadmin | super@soil.com | $2b$10$hash... | 2024-12-01 08:05:00 |

### Business Rules

1. Username must be unique
2. Email must be unique
3. Password must be hashed with bcrypt
4. Admins have full CRUD access to crops and fertilizers
5. Admins cannot access farmer-specific data (soil tests)
6. Separate login system from farmers
7. JWT tokens include `isAdmin: true` flag

### Admin Privileges

**Can Perform:**
- ✅ Create, Read, Update, Delete crops
- ✅ Create, Read, Update, Delete fertilizers
- ✅ View system statistics
- ✅ Manage ideal crop requirements

**Cannot Perform:**
- ❌ Access individual farmer accounts
- ❌ View or modify farmer soil tests
- ❌ Access farmer dashboard

### Authentication Flow

1. Admin logs in with email and password
2. System verifies credentials against admins table
3. JWT token generated with `isAdmin: true` flag
4. Token required for all admin API endpoints
5. Middleware checks `isAdmin` flag before allowing access

---

## DATABASE RELATIONSHIPS DIAGRAM

```
┌─────────────────┐
│    FARMERS      │
│  (farmer_id)    │
└────────┬────────┘
         │ 1
         │
         │ HAS
         │
         │ N
         ▼
┌─────────────────┐
│  SOIL_TESTS     │
│   (test_id)     │
└────────┬────────┘
         │ 1
         │
         │ GENERATES
         │
         │ 1
         ▼
┌─────────────────┐
│ RECOMMENDATIONS │
│    (rec_id)     │
└─────────────────┘


┌─────────────────┐
│     CROPS       │
│   (crop_id)     │
└────────┬────────┘
         │ 1
         │
         │ HAS
         │
         │ 1
         ▼
┌─────────────────────┐
│ IDEAL_REQUIREMENTS  │
│    (ideal_id)       │
└─────────────────────┘


┌─────────────────┐
│  FERTILIZERS    │
│   (fert_id)     │
└─────────────────┘
(Referenced by recommendation algorithm)


┌─────────────────┐
│     ADMINS      │
│   (admin_id)    │
└─────────────────┘
(Independent - manages crops & fertilizers)
```

---

## FOREIGN KEY CONSTRAINTS SUMMARY

| Child Table | Foreign Key Column | Parent Table | Parent Column | On Delete | On Update |
|-------------|-------------------|--------------|---------------|-----------|-----------|
| soil_tests | farmer_id | farmers | farmer_id | CASCADE | CASCADE |
| recommendations | test_id | soil_tests | test_id | CASCADE | CASCADE |
| ideal_requirements | crop_id | crops | crop_id | CASCADE | CASCADE |

### CASCADE Behavior Explanation

**ON DELETE CASCADE:**
- Deleting a farmer automatically deletes all their soil_tests
- Deleting a soil_test automatically deletes its recommendation
- Deleting a crop automatically deletes its ideal_requirements

**ON UPDATE CASCADE:**
- Updating a primary key automatically updates all foreign key references
- Maintains referential integrity

---

## DATA TYPES EXPLANATION

### INT (Integer)
- **Size:** 4 bytes
- **Range:** -2,147,483,648 to 2,147,483,647
- **Usage:** Primary keys, foreign keys, IDs
- **AUTO_INCREMENT:** Automatically generates sequential numbers

### VARCHAR(n) (Variable Character)
- **Size:** Variable, up to n characters
- **Storage:** Actual length + 1 or 2 bytes
- **Usage:** Names, emails, text fields with known max length
- **Example:** VARCHAR(100) can store 0-100 characters

### DECIMAL(p,s) (Fixed-Point Number)
- **p:** Precision (total digits)
- **s:** Scale (digits after decimal point)
- **DECIMAL(4,2):** Max 99.99 (e.g., pH values)
- **DECIMAL(6,2):** Max 9999.99 (e.g., NPK values)
- **DECIMAL(5,2):** Max 999.99 (e.g., percentages)
- **Usage:** Precise numeric values (money, measurements)

### TEXT
- **Size:** Up to 65,535 characters
- **Usage:** Large text data, JSON strings
- **Note:** Cannot have default value

### TIMESTAMP
- **Size:** 4 bytes
- **Range:** 1970-01-01 to 2038-01-19
- **Format:** YYYY-MM-DD HH:MM:SS
- **Usage:** Date and time tracking
- **DEFAULT CURRENT_TIMESTAMP:** Auto-sets to current time

---

## INDEXES AND PERFORMANCE

### Purpose of Indexes
- Speed up data retrieval queries
- Improve JOIN performance
- Enforce uniqueness constraints

### Indexes in System

**farmers table:**
- `PRIMARY KEY (farmer_id)` - Auto-indexed
- `UNIQUE KEY (email)` - Auto-indexed
- `INDEX idx_farmer_email` - Speeds up login queries

**soil_tests table:**
- `PRIMARY KEY (test_id)` - Auto-indexed
- `INDEX idx_soil_test_farmer` - Speeds up farmer's test history queries
- `INDEX idx_test_date` - Enables fast date-based sorting

**crops table:**
- `PRIMARY KEY (crop_id)` - Auto-indexed
- `UNIQUE KEY (crop_name)` - Auto-indexed

**Other tables:**
- All primary keys automatically indexed
- Foreign keys automatically indexed by InnoDB

### Query Performance Examples

**Fast Query (uses index):**
```sql
SELECT * FROM farmers WHERE email = 'john@example.com';
-- Uses idx_farmer_email index
```

**Fast Query (uses index):**
```sql
SELECT * FROM soil_tests WHERE farmer_id = 1 ORDER BY test_date DESC;
-- Uses idx_soil_test_farmer and idx_test_date indexes
```

---


## NORMALIZATION ANALYSIS

### First Normal Form (1NF)
**Requirements:**
- Each column contains atomic (indivisible) values
- No repeating groups
- Each column contains values of a single type

**Compliance:**
✅ All tables meet 1NF requirements
- All columns contain atomic values
- No multi-valued attributes
- Each column has a single data type
- Primary keys uniquely identify each row

**Example:**
- ❌ Bad: `crops` column containing "Wheat, Rice, Corn"
- ✅ Good: Separate rows for each crop in recommendations (stored as JSON array)

---

### Second Normal Form (2NF)
**Requirements:**
- Must be in 1NF
- All non-key attributes fully dependent on primary key
- No partial dependencies

**Compliance:**
✅ All tables meet 2NF requirements
- All tables have single-column primary keys
- No composite keys, so no partial dependencies possible
- All attributes depend on the entire primary key

**Example:**
- `soil_tests` table: pH, nitrogen, phosphorus, potassium all depend on test_id
- No attribute depends on only part of the key

---

### Third Normal Form (3NF)
**Requirements:**
- Must be in 2NF
- No transitive dependencies
- All attributes depend only on primary key

**Compliance:**
✅ All tables meet 3NF requirements

**Analysis:**

**farmers table:**
- All attributes (name, email, phone, password) depend directly on farmer_id
- No transitive dependencies

**soil_tests table:**
- pH, nitrogen, phosphorus, potassium depend on test_id
- farmer_id is a foreign key (acceptable dependency)
- No transitive dependencies

**crops and ideal_requirements:**
- Separated into two tables to eliminate transitive dependency
- ❌ Bad (not 3NF): crops(crop_id, crop_name, ideal_pH_min, ideal_pH_max, ...)
  - ideal_pH_min depends on crop_name, not directly on crop_id
- ✅ Good (3NF): 
  - crops(crop_id, crop_name)
  - ideal_requirements(ideal_id, crop_id, ideal_pH_min, ...)

**fertilizers table:**
- All NPK content values depend directly on fert_id
- No transitive dependencies

**recommendations table:**
- recommended_crops and fertilizer_suggestions depend on test_id
- No transitive dependencies

---

## CONSTRAINTS AND VALIDATIONS

### Primary Key Constraints
**Purpose:** Ensure unique identification of each record

| Table | Primary Key | Type |
|-------|-------------|------|
| farmers | farmer_id | INT AUTO_INCREMENT |
| soil_tests | test_id | INT AUTO_INCREMENT |
| crops | crop_id | INT AUTO_INCREMENT |
| ideal_requirements | ideal_id | INT AUTO_INCREMENT |
| fertilizers | fert_id | INT AUTO_INCREMENT |
| recommendations | rec_id | INT AUTO_INCREMENT |
| admins | admin_id | INT AUTO_INCREMENT |

**Benefits:**
- Guarantees uniqueness
- Enables efficient indexing
- Provides stable references for foreign keys

---

### Foreign Key Constraints

**soil_tests.farmer_id → farmers.farmer_id**
```sql
FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) 
ON DELETE CASCADE ON UPDATE CASCADE
```
- Ensures every test belongs to a valid farmer
- Deleting farmer removes all their tests
- Maintains referential integrity

**recommendations.test_id → soil_tests.test_id**
```sql
FOREIGN KEY (test_id) REFERENCES soil_tests(test_id) 
ON DELETE CASCADE ON UPDATE CASCADE
```
- Ensures every recommendation links to a valid test
- Deleting test removes its recommendation
- Prevents orphaned recommendations

**ideal_requirements.crop_id → crops.crop_id**
```sql
FOREIGN KEY (crop_id) REFERENCES crops(crop_id) 
ON DELETE CASCADE ON UPDATE CASCADE
```
- Ensures requirements belong to a valid crop
- Deleting crop removes its requirements
- Maintains data consistency

---

### Unique Constraints

**farmers.email**
```sql
email VARCHAR(100) UNIQUE NOT NULL
```
- Prevents duplicate email addresses
- Ensures one account per email
- Used for login authentication

**crops.crop_name**
```sql
crop_name VARCHAR(50) NOT NULL UNIQUE
```
- Prevents duplicate crop names
- Ensures data consistency
- Simplifies crop lookup

**admins.username and admins.email**
```sql
username VARCHAR(50) NOT NULL UNIQUE
email VARCHAR(100) UNIQUE NOT NULL
```
- Prevents duplicate admin accounts
- Ensures unique identification

---

### NOT NULL Constraints

**Critical Fields:**
- All primary keys (implicit)
- Authentication fields (email, password)
- Core data fields (pH, nitrogen, phosphorus, potassium)
- Foreign keys (farmer_id, test_id, crop_id)

**Optional Fields:**
- farmers.phone (contact number not mandatory)

**Purpose:**
- Ensures data completeness
- Prevents missing critical information
- Maintains data quality

---

### Check Constraints (Application Level)

**pH Validation:**
```javascript
if (pH < 0 || pH > 14) {
    return error('pH must be between 0 and 14');
}
```

**NPK Validation:**
```javascript
if (nitrogen < 0 || phosphorus < 0 || potassium < 0) {
    return error('NPK values must be positive');
}
```

**Email Format Validation:**
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    return error('Invalid email format');
}
```

**Password Strength:**
```javascript
if (password.length < 6) {
    return error('Password must be at least 6 characters');
}
```

---

## SECURITY FEATURES

### Password Security

**Hashing Algorithm:** bcrypt
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

**Benefits:**
- One-way encryption (cannot be reversed)
- Salt rounds: 10 (good balance of security and performance)
- Resistant to rainbow table attacks
- Industry-standard security

**Password Verification:**
```javascript
const validPassword = await bcrypt.compare(password, hashedPassword);
```

---

### SQL Injection Prevention

**Parameterized Queries:**
```javascript
// SECURE - Uses placeholders
await db.query('SELECT * FROM farmers WHERE email = ?', [email]);

// INSECURE - Never used in our system
// await db.query(`SELECT * FROM farmers WHERE email = '${email}'`);
```

**Benefits:**
- Prevents SQL injection attacks
- Separates SQL code from data
- Database handles escaping automatically

---

### Authentication & Authorization

**JWT (JSON Web Tokens):**
```javascript
const token = jwt.sign(
    { farmerId: farmer.farmer_id, email: farmer.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);
```

**Features:**
- Stateless authentication
- 24-hour expiration
- Signed with secret key
- Contains user identification

**Authorization Middleware:**
```javascript
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};
```

**Admin Authorization:**
```javascript
if (!admin.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
}
```

---

## DATABASE BACKUP AND MAINTENANCE

### Backup Strategy

**Export Database:**
```bash
mysqldump -u root -p soil_analysis_db > backup.sql
```

**Import Database:**
```bash
mysql -u root -p soil_analysis_db < backup.sql
```

**Recommended Schedule:**
- Daily backups during development
- Weekly backups in production
- Before major updates or migrations

---

### Maintenance Tasks

**Optimize Tables:**
```sql
OPTIMIZE TABLE farmers, soil_tests, crops, ideal_requirements, fertilizers, recommendations, admins;
```

**Check Table Integrity:**
```sql
CHECK TABLE farmers, soil_tests, crops;
```

**Analyze Tables (Update Statistics):**
```sql
ANALYZE TABLE farmers, soil_tests, recommendations;
```

---

## SAMPLE QUERIES

### Common SELECT Queries

**Get Farmer's Test History:**
```sql
SELECT st.test_id, st.pH, st.nitrogen, st.phosphorus, st.potassium, 
       st.test_date, r.recommended_crops, r.fertilizer_suggestions
FROM soil_tests st
LEFT JOIN recommendations r ON st.test_id = r.test_id
WHERE st.farmer_id = 1
ORDER BY st.test_date DESC;
```

**Get All Crops with Requirements:**
```sql
SELECT c.crop_id, c.crop_name, 
       ir.ideal_pH_min, ir.ideal_pH_max,
       ir.ideal_N, ir.ideal_P, ir.ideal_K
FROM crops c
JOIN ideal_requirements ir ON c.crop_id = ir.crop_id
ORDER BY c.crop_name;
```

**Get Fertilizers High in Nitrogen:**
```sql
SELECT fert_name, nitrogen_content
FROM fertilizers
WHERE nitrogen_content > 20
ORDER BY nitrogen_content DESC;
```

---

### Common INSERT Queries

**Register New Farmer:**
```sql
INSERT INTO farmers (name, email, phone, password)
VALUES ('John Doe', 'john@example.com', '9876543210', '$2b$10$hash...');
```

**Submit Soil Test:**
```sql
INSERT INTO soil_tests (farmer_id, pH, nitrogen, phosphorus, potassium)
VALUES (1, 6.5, 50.0, 40.0, 60.0);
```

**Add New Crop:**
```sql
INSERT INTO crops (crop_name) VALUES ('Tomato');
INSERT INTO ideal_requirements (crop_id, ideal_pH_min, ideal_pH_max, ideal_N, ideal_P, ideal_K)
VALUES (LAST_INSERT_ID(), 6.0, 7.0, 120.0, 80.0, 100.0);
```

---

### Common UPDATE Queries

**Update Soil Test:**
```sql
UPDATE soil_tests
SET pH = 7.0, nitrogen = 80.0, phosphorus = 55.0, potassium = 70.0
WHERE test_id = 1 AND farmer_id = 1;
```

**Update Crop Requirements:**
```sql
UPDATE ideal_requirements
SET ideal_N = 110.0, ideal_P = 65.0, ideal_K = 85.0
WHERE crop_id = 1;
```

**Update Fertilizer:**
```sql
UPDATE fertilizers
SET nitrogen_content = 45.0
WHERE fert_id = 1;
```

---

### Common DELETE Queries

**Delete Soil Test:**
```sql
DELETE FROM soil_tests
WHERE test_id = 1 AND farmer_id = 1;
-- Recommendation automatically deleted (CASCADE)
```

**Delete Crop:**
```sql
DELETE FROM crops
WHERE crop_id = 1;
-- Ideal requirements automatically deleted (CASCADE)
```

**Delete Farmer Account:**
```sql
DELETE FROM farmers
WHERE farmer_id = 1;
-- All soil_tests and recommendations automatically deleted (CASCADE)
```

---

## DATABASE STATISTICS

### Storage Estimates

| Table | Avg Row Size | Rows (Est.) | Total Size (Est.) |
|-------|--------------|-------------|-------------------|
| farmers | 200 bytes | 1,000 | 200 KB |
| soil_tests | 50 bytes | 10,000 | 500 KB |
| crops | 30 bytes | 50 | 1.5 KB |
| ideal_requirements | 40 bytes | 50 | 2 KB |
| fertilizers | 80 bytes | 20 | 1.6 KB |
| recommendations | 2,000 bytes | 10,000 | 20 MB |
| admins | 200 bytes | 5 | 1 KB |
| **TOTAL** | - | **21,125** | **~21 MB** |

**Note:** Recommendations table is largest due to TEXT fields storing JSON data

---

## CONCLUSION

The database schema for the Soil Analysis and Crop Recommendation System is:

✅ **Well-Normalized:** Meets 3NF standards  
✅ **Secure:** Password hashing, SQL injection prevention  
✅ **Efficient:** Proper indexing for fast queries  
✅ **Maintainable:** Clear relationships and constraints  
✅ **Scalable:** Can handle thousands of users and tests  
✅ **Reliable:** CASCADE deletes maintain referential integrity  
✅ **Flexible:** JSON storage for complex recommendation data  

The schema supports all system requirements including:
- User authentication and authorization
- Soil test management with CRUD operations
- Intelligent crop recommendation algorithm
- Fertilizer suggestion system
- Admin panel for data management
- Historical test tracking and reporting

---

**Database Version:** MySQL 5.7+  
**Schema Version:** 1.0  
**Last Updated:** December 2024  
**Total Tables:** 7  
**Total Relationships:** 3 Foreign Keys  

---

END OF DETAILED DATABASE SCHEMA DOCUMENTATION
