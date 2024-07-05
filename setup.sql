CREATE DATABASE banking_system;

USE banking_system;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    current_balance DECIMAL(10, 2) NOT NULL
);

CREATE TABLE transfers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES customers(id),
    FOREIGN KEY (receiver_id) REFERENCES customers(id)
);

INSERT INTO customers (name, email, current_balance) VALUES
('Alice', 'alice@example.com', 1000.00),
('Bob', 'bob@example.com', 1500.00),
('Charlie', 'charlie@example.com', 2000.00),
('David', 'david@example.com', 2500.00),
('Eve', 'eve@example.com', 3000.00),
('Frank', 'frank@example.com', 3500.00),
('Grace', 'grace@example.com', 4000.00),
('Hank', 'hank@example.com', 4500.00),
('Ivy', 'ivy@example.com', 5000.00),
('Jack', 'jack@example.com', 5500.00);
