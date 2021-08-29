const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  AllEmployees() {
    try {
      return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }
    catch (err) {
      console.log(err);
    }
  }

  AllPossibleManagers(employeeId) {
    try {
      return this.connection.promise().query("SELECT id, first_name, last_name FROM employee WHERE id != ?",employeeId);
    }
    catch (err) {
      console.log(err);
    }
  }

  createEmployee(employee) {
    try {
      return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }
    catch (err) {
      console.log(err);
    }
  }

  removeEmployee(employeeId) {
    try {
      return this.connection.promise().query("DELETE FROM employee WHERE id = ?",employeeId);
    }
    catch (err) {
      console.log(err);
    }
  }

  updateRole(employeeId, roleId) {
    try {
      return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?",[roleId, employeeId]);
    }
    catch (err) {
      console.log(err);
    }
  }

  updateManager(employeeId, managerId) {
    try {
      return this.connection.promise().query("UPDATE employee SET manager_id = ? WHERE id = ?",[managerId, employeeId]);
    }
    catch (err) {
      console.log(err);
    }
  }

  AllRoles() {
    try {
      return this.connection.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
    }
    catch (err) {
      console.log(err);
    }
  }

  createRole(role) {
    try {
      return this.connection.promise().query("INSERT INTO role SET ?", role);
    }
    catch (err) {
      console.log(err);
    }
  }

  removeRole(roleId) {
    try {
      return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }
    catch (err) {
      console.log(err);
    }
  }

  AllDepartments() {
    try {
      return this.connection.promise().query("SELECT department.id, department.name FROM department;");
    }
    catch (err) {
      console.log(err);
    }
  }

  createDepartment(department) {
    try {
      return this.connection.promise().query("INSERT INTO department SET ?", department);
    }
    catch (err) {
      console.log(err);
    }
  }

  removeDepartment(departmentId) {
    try {
      return this.connection.promise().query("DELETE FROM department WHERE id = ?",departmentId);
    }
    catch (err) {
      console.log(err);
    }
  }

  AllEmployeesByDepartment(departmentId) {
    try {
      return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",departmentId);
    }
    catch (err) {
      console.log(err);
    }
  }

  AllEmployeesByManager(managerId) {
    try {
      return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",managerId);
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports = new DB(connection);