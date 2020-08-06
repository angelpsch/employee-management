var connection = require("./connection");
class db {
    constructor(connection) {
        this.connection = connection;
    }

    findEmployees() {
        return this.connection.query(
            "SELECT * FROM employee"
        );
    }
    viewDepts() {
        return this.connection.query(
            "SELECT * FROM departments"
        )
    }
    findRoles() {
        return this.connection.query(
            "SELECT * FROM roles"
        )
    }

    addEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        )
    }

    addDept(department) {
        return this.connection.query(
            "INSERT INTO departments SET ?", department
        )
    }
    updateRole(roleId, employeeId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    addRole(role) {
        return this.connection.query(
            "INSERT INTO roles SET ?", role
        )
    }
};

module.exports = new db(connection);
