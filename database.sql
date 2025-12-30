-- EMPLOYEE MANAGEMENT SYSTEM DATABASE
-- Simple & Complete

CREATE DATABASE IF NOT EXISTS ems_database;
USE ems_database;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(50) NOT NULL,
    position VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    join_date DATE NOT NULL,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_department (department),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Default Admin User
-- Password: admin123
INSERT INTO users (fullname, email, password, role) VALUES
('Admin User', 'admin@ems.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert Sample Employees
INSERT INTO employees (name, email, phone, department, position, salary, join_date, status) VALUES
('John Smith', 'john.smith@company.com', '+1-555-0101', 'IT', 'Senior Developer', 85000.00, '2022-01-15', 'Active'),
('Sarah Johnson', 'sarah.johnson@company.com', '+1-555-0102', 'HR', 'HR Manager', 75000.00, '2021-03-20', 'Active'),
('Michael Brown', 'michael.brown@company.com', '+1-555-0103', 'Finance', 'Financial Analyst', 70000.00, '2022-06-10', 'Active'),
('Emily Davis', 'emily.davis@company.com', '+1-555-0104', 'Marketing', 'Marketing Specialist', 65000.00, '2023-02-01', 'Active'),
('David Wilson', 'david.wilson@company.com', '+1-555-0105', 'Sales', 'Sales Executive', 68000.00, '2022-09-15', 'Active');

SELECT 'Database setup completed successfully!' as Status;
