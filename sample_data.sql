-- Sample Data for Soil Analysis System
USE soil_analysis_db;

-- Insert Crops
INSERT INTO crops (crop_name) VALUES
('Rice'),
('Wheat'),
('Maize'),
('Soybean'),
('Cotton'),
('Sugarcane'),
('Pearl Millet'),
('Finger Millet'),
('Groundnut'),
('Chickpea'),
('Pigeon Pea'),
('Green Gram'),
('Black Gram'),
('Tomato'),
('Potato');

-- Insert Ideal Requirements for each crop
-- Format: crop_id, pH_min, pH_max, N, P, K
INSERT INTO ideal_requirements (crop_id, ideal_pH_min, ideal_pH_max, ideal_N, ideal_P, ideal_K) VALUES
(1, 5.5, 7.0, 120, 60, 60),   -- Rice
(2, 6.0, 7.5, 100, 50, 50),   -- Wheat
(3, 5.8, 7.0, 150, 60, 40),   -- Maize
(4, 6.0, 7.0, 30, 60, 40),    -- Soybean
(5, 6.0, 7.5, 120, 60, 60),   -- Cotton
(6, 6.0, 7.5, 200, 80, 100),  -- Sugarcane
(7, 6.5, 8.0, 80, 40, 40),    -- Pearl Millet
(8, 5.0, 7.0, 50, 40, 40),    -- Finger Millet
(9, 6.0, 7.0, 25, 50, 75),    -- Groundnut
(10, 6.0, 7.5, 25, 60, 40),   -- Chickpea
(11, 6.5, 7.5, 25, 50, 40),   -- Pigeon Pea
(12, 6.5, 7.5, 25, 50, 40),   -- Green Gram
(13, 6.5, 7.5, 25, 50, 40),   -- Black Gram
(14, 6.0, 7.0, 150, 80, 100), -- Tomato
(15, 5.5, 6.5, 120, 80, 100); -- Potato

-- Insert Fertilizers with NPK content
INSERT INTO fertilizers (fert_name, nitrogen_content, phosphorus_content, potassium_content) VALUES
('Urea', 46.0, 0.0, 0.0),
('DAP (Diammonium Phosphate)', 18.0, 46.0, 0.0),
('MOP (Muriate of Potash)', 0.0, 0.0, 60.0),
('NPK 10-26-26', 10.0, 26.0, 26.0),
('NPK 20-20-20', 20.0, 20.0, 20.0),
('Ammonium Sulphate', 21.0, 0.0, 0.0),
('Single Super Phosphate (SSP)', 0.0, 16.0, 0.0),
('Triple Super Phosphate (TSP)', 0.0, 46.0, 0.0),
('Potassium Sulphate', 0.0, 0.0, 50.0),
('NPK 15-15-15', 15.0, 15.0, 15.0);

-- Insert sample farmer (password: farmer123 - should be hashed in production)
INSERT INTO farmers (name, email, phone, password) VALUES
('John Farmer', 'john@example.com', '9876543210', '$2b$10$abcdefghijklmnopqrstuvwxyz123456789');
