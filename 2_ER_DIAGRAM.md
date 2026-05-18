# ENTITY-RELATIONSHIP DIAGRAM (ERD)
## Soil Analysis and Crop Recommendation System

---

## ER DIAGRAM (Textual Representation)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SOIL ANALYSIS SYSTEM - ER DIAGRAM                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│     FARMERS      │
├──────────────────┤
│ PK farmer_id     │
│    name          │
│    email (U)     │
│    phone         │
│    password      │
│    created_at    │
└────────┬─────────┘
         │
         │ 1
         │
         │ HAS
         │
         │ N
         ▼
┌──────────────────┐
│   SOIL_TESTS     │
├──────────────────┤
│ PK test_id       │
│ FK farmer_id     │
│    pH            │
│    nitrogen      │
│    phosphorus    │
│    potassium     │
│    test_date     │
└────────┬─────────┘
         │
         │ 1
         │
         │ GENERATES
         │
         │ 1
         ▼
┌──────────────────────┐
│   RECOMMENDATIONS    │
├──────────────────────┤
│ PK rec_id            │
│ FK test_id           │
│    recommended_crops │
│    fertilizer_sugg   │
│    created_at        │
└──────────────────────┘


┌──────────────────┐
│      CROPS       │
├──────────────────┤
│ PK crop_id       │
│    crop_name (U) │
└────────┬─────────┘
         │
         │ 1
         │
         │ HAS
         │
         │ 1
         ▼
┌──────────────────────┐
│ IDEAL_REQUIREMENTS   │
├──────────────────────┤
│ PK ideal_id          │
│ FK crop_id           │
│    ideal_pH_min      │
│    ideal_pH_max      │
│    ideal_N           │
│    ideal_P           │
│    ideal_K           │
└──────────────────────┘


┌──────────────────────┐
│    FERTILIZERS       │
├──────────────────────┤
│ PK fert_id           │
│    fert_name         │
│    nitrogen_content  │
│    phosphorus_content│
│    potassium_content │
└──────────────────────┘
```

---

## ENTITIES AND ATTRIBUTES

### 1. FARMERS
**Description:** Stores information about registered farmers

**Attributes:**
- farmer_id (Primary Key): Unique identifier for each farmer
- name: Full name of the farmer
- email (Unique): Email address for login
- phone: Contact number
- password: Hashed password for authentication
- created_at: Registration timestamp

### 2. SOIL_TESTS
**Description:** Stores soil test data submitted by farmers

**Attributes:**
- test_id (Primary Key): Unique identifier for each test
- farmer_id (Foreign Key): References farmers table
- pH: Soil pH level (0-14)
- nitrogen: Nitrogen content in kg/hectare
- phosphorus: Phosphorus content in kg/hectare
- potassium: Potassium content in kg/hectare
- test_date: Timestamp of test submission

### 3. CROPS
**Description:** Master table of available crops

**Attributes:**
- crop_id (Primary Key): Unique identifier for each crop
- crop_name (Unique): Name of the crop

### 4. IDEAL_REQUIREMENTS
**Description:** Stores ideal soil conditions for each crop

**Attributes:**
- ideal_id (Primary Key): Unique identifier
- crop_id (Foreign Key): References crops table
- ideal_pH_min: Minimum pH requirement
- ideal_pH_max: Maximum pH requirement
- ideal_N: Ideal nitrogen level
- ideal_P: Ideal phosphorus level
- ideal_K: Ideal potassium level

### 5. FERTILIZERS
**Description:** Master table of available fertilizers

**Attributes:**
- fert_id (Primary Key): Unique identifier for each fertilizer
- fert_name: Name of the fertilizer
- nitrogen_content: Percentage of nitrogen
- phosphorus_content: Percentage of phosphorus
- potassium_content: Percentage of potassium

### 6. RECOMMENDATIONS
**Description:** Stores generated recommendations for each test

**Attributes:**
- rec_id (Primary Key): Unique identifier
- test_id (Foreign Key): References soil_tests table
- recommended_crops: JSON data of recommended crops
- fertilizer_suggestions: JSON data of fertilizer recommendations
- created_at: Timestamp of recommendation generation

---

## RELATIONSHIPS

### 1. FARMERS ──(1:N)──> SOIL_TESTS
- **Cardinality:** One-to-Many
- **Description:** One farmer can submit multiple soil tests
- **Foreign Key:** soil_tests.farmer_id references farmers.farmer_id

### 2. SOIL_TESTS ──(1:1)──> RECOMMENDATIONS
- **Cardinality:** One-to-One
- **Description:** Each soil test generates one recommendation
- **Foreign Key:** recommendations.test_id references soil_tests.test_id

### 3. CROPS ──(1:1)──> IDEAL_REQUIREMENTS
- **Cardinality:** One-to-One
- **Description:** Each crop has one set of ideal requirements
- **Foreign Key:** ideal_requirements.crop_id references crops.crop_id

---

## CONSTRAINTS

### Primary Key Constraints
- All tables have a primary key for unique identification
- Auto-increment for automatic ID generation

### Foreign Key Constraints
- ON DELETE CASCADE for soil_tests (deleting farmer removes their tests)
- ON DELETE CASCADE for recommendations (deleting test removes recommendations)
- ON DELETE CASCADE for ideal_requirements (deleting crop removes requirements)

### Unique Constraints
- farmers.email: Ensures unique email addresses
- crops.crop_name: Ensures unique crop names

### Check Constraints (Application Level)
- pH value between 0 and 14
- NPK values must be positive
- Email format validation
- Password minimum length

---

## INDEXES

### Performance Optimization
- Index on farmers.email for fast login queries
- Index on soil_tests.farmer_id for farmer's test retrieval
- Index on soil_tests.test_date for chronological sorting
- Primary keys automatically indexed

---

## NORMALIZATION

### First Normal Form (1NF)
✓ All attributes contain atomic values
✓ No repeating groups
✓ Each column contains values of a single type

### Second Normal Form (2NF)
✓ Meets 1NF requirements
✓ All non-key attributes fully dependent on primary key
✓ No partial dependencies

### Third Normal Form (3NF)
✓ Meets 2NF requirements
✓ No transitive dependencies
✓ All attributes depend only on primary key

---

## DATA INTEGRITY

### Entity Integrity
- Primary keys ensure unique identification
- No null values in primary keys

### Referential Integrity
- Foreign keys maintain relationships
- Cascade operations maintain consistency

### Domain Integrity
- Data type constraints
- Range validations
- Format validations

---

## ER DIAGRAM NOTATION

**Symbols Used:**
- Rectangle: Entity
- Oval: Attribute
- Diamond: Relationship
- Line: Connection
- PK: Primary Key
- FK: Foreign Key
- U: Unique Constraint
- 1: One
- N: Many

---

END OF ER DIAGRAM DOCUMENTATION
