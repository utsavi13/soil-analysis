-- Soil Analysis and Crop Recommendation System
-- Database Schema

CREATE DATABASE IF NOT EXISTS soil_analysis_db;
USE soil_analysis_db;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS recommendations;
DROP TABLE IF EXISTS fertilizers;
DROP TABLE IF EXISTS ideal_requirements;
DROP TABLE IF EXISTS crops;
DROP TABLE IF EXISTS soil_tests;
DROP TABLE IF EXISTS farmers;

-- Table: farmers
CREATE TABLE farmers (
    farmer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: soil_tests
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

-- Table: crops
CREATE TABLE crops (
    crop_id INT AUTO_INCREMENT PRIMARY KEY,
    crop_name VARCHAR(50) NOT NULL UNIQUE
);

-- Table: ideal_requirements
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

-- Table: fertilizers
CREATE TABLE fertilizers (
    fert_id INT AUTO_INCREMENT PRIMARY KEY,
    fert_name VARCHAR(100) NOT NULL,
    nitrogen_content DECIMAL(5,2) NOT NULL,
    phosphorus_content DECIMAL(5,2) NOT NULL,
    potassium_content DECIMAL(5,2) NOT NULL
);

-- Table: recommendations
CREATE TABLE recommendations (
    rec_id INT AUTO_INCREMENT PRIMARY KEY,
    test_id INT NOT NULL,
    recommended_crops TEXT,
    fertilizer_suggestions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES soil_tests(test_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_farmer_email ON farmers(email);
CREATE INDEX idx_soil_test_farmer ON soil_tests(farmer_id);
CREATE INDEX idx_test_date ON soil_tests(test_date);
