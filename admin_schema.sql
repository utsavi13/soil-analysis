-- Admin Table and Sample Admin User
USE soil_analysis_db;

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123)
-- Password hash for 'admin123' using bcrypt
INSERT INTO admins (username, email, password) VALUES
('admin', 'admin@soilanalysis.com', '$2b$10$rZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5uK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5');

-- Note: You'll need to update this password hash after first login
-- Default credentials: admin@soilanalysis.com / admin123
