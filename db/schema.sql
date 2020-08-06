DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
USE employees_DB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT primary key,
    first_name VARCHAR(50),
    last_name VARCHAR(50), 
    role_id INT NOT NULL, 
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT primary key,
    department_name VARCHAR(100)  UNIQUE NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT primary key,
    title VARCHAR(100) NOT NULL UNIQUE,
    department_id INT NOT NULL
);

