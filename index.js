const { prompt } = require("inquirer");
const consoleTable = require("console.table");
const db = require("./db");

function init() {
  Initial();
}

function Initial() {
    prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "View All Departments",
          "Add Department",
          "Remove Department",
          "Quit",
        ],
        value: "choice",
        name: "choice"
      }
    ]).then(function(choice) {
      if (choice === "View All Employees") {
        db.AllEmployees()
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => Initial());

      } else if (choice === "View All Employees By Department") {
        db.AllDepartments()
        .then(([rows]) => {
          let departments = rows;
          const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
          }));
  
          prompt([
            {
              type: "list",
              name: "departmentId",
              message: "Which department would you like to see employees for?",
              choices: departmentChoices
            }
          ])
            .then(res => db.AllEmployeesByDepartment(res.departmentId))
            .then(([rows]) => {
              let employees = rows;
              console.log("\n");
              console.table(employees);
            })
            .then(() => Initial())
        });

      } else if (choice === "View All Employees By Manager") {
        db.AllEmployees()
        .then(([rows]) => {
          let managers = rows;
          const managerChoices = managers.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }));
    
          prompt([
            {
              type: "list",
              name: "managerId",
              message: "Which employee do you want to see direct reports for?",
              choices: managerChoices
            }
          ])
            .then(res => db.AllEmployeesByManager(res.managerId))
            .then(([rows]) => {
              let employees = rows;
              console.log("\n");
              if (employees.length === 0) {
                console.log("The selected employee has no direct reports");
              } else {
                console.table(employees);
              }
            })
            .then(() => Initial())
        });

      } else if (choice === "Add Employee") {
        prompt([
          {
            name: "first_name",
            message: "What is the employee's first name?"
          },
          {
            name: "last_name",
            message: "What is the employee's last name?"
          }
        ])
          .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;
      
            db.AllRoles()
              .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                  name: title,
                  value: id
                }));
      
                prompt({
                  type: "list",
                  name: "roleId",
                  message: "What is the employee's role?",
                  choices: roleChoices
                })
                  .then(res => {
                    let roleId = res.roleId;
      
                    db.AllEmployees()
                      .then(([rows]) => {
                        let employees = rows;
                        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                          name: `${first_name} ${last_name}`,
                          value: id
                        }));
      
                        managerChoices.unshift({ name: "None", value: null });
      
                        prompt({
                          type: "list",
                          name: "managerId",
                          message: "Who is the employee's manager?",
                          choices: managerChoices
                        })
                          .then(res => {
                            let employee = {
                              manager_id: res.managerId,
                              role_id: roleId,
                              first_name: firstName,
                              last_name: lastName
                            }
      
                            db.createEmployee(employee);
                          })
                          .then(() => console.log(
                            `Added ${firstName} ${lastName} to the database`
                          ))
                          .then(() => initial())
                      })
                  })
              })
          })

      } else if (choice === "Remove Employee") {
        db.AllEmployees()
        .then(([rows]) => {
          let employees = rows;
          const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }));
    
          prompt([
            {
              type: "list",
              name: "employeeId",
              message: "Which employee do you want to remove?",
              choices: employeeChoices
            }
          ])
            .then(res => db.removeEmployee(res.employeeId))
            .then(() => console.log("Removed employee from the database"))
            .then(() => Initial())
        })

      } else if (choice === "Update Employee Role") {
        db.AllEmployees()
        .then(([rows]) => {
          let employees = rows;
          const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }));
    
          prompt([
            {
              type: "list",
              name: "employeeId",
              message: "Which employee's role do you want to update?",
              choices: employeeChoices
            }
          ])
            .then(res => {
              let employeeId = res.employeeId;
              db.AllRoles()
                .then(([rows]) => {
                  let roles = rows;
                  const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                  }));
    
                  prompt([
                    {
                      type: "list",
                      name: "roleId",
                      message: "Which role do you want to assign the selected employee?",
                      choices: roleChoices
                    }
                  ])
                    .then(res => db.updateRole(employeeId, res.roleId))
                    .then(() => console.log("Updated employee's role"))
                    .then(() => Initial())
                });
            });
        })

      } else if (choice === "Update Employee Manager") {
        db.AllEmployees()
        .then(([rows]) => {
          let employees = rows;
          const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }));
    
          prompt([
            {
              type: "list",
              name: "employeeId",
              message: "Which employee's manager do you want to update?",
              choices: employeeChoices
            }
          ])
            .then(res => {
              let employeeId = res.employeeId
              db.AllPossibleManagers(employeeId)
                .then(([rows]) => {
                  let managers = rows;
                  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));
    
                  prompt([
                    {
                      type: "list",
                      name: "managerId",
                      message:
                        "Which employee do you want to set as manager for the selected employee?",
                      choices: managerChoices
                    }
                  ])
                    .then(res => db.updateManager(employeeId, res.managerId))
                    .then(() => console.log("Updated employee's manager"))
                    .then(() => Initial())
                })
            })
        })



        
      } else if (choice === "View All Roles") {
        db.AllRoles()
        .then(([rows]) => {
          let roles = rows;
          console.log("\n");
          console.table(roles);
        })
        .then(() => initial());

      } else if (choice === "Add Role") {
        db.AllDepartments()
        .then(([rows]) => {
          let departments = rows;
          const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
          }));
    
          prompt([
            {
              name: "title",
              message: "What is the name of the role?"
            },
            {
              name: "salary",
              message: "What is the salary of the role?"
            },
            {
              type: "list",
              name: "department_id",
              message: "Which department does the role belong to?",
              choices: departmentChoices
            }
          ])
            .then(role => {
              db.createRole(role)
                .then(() => console.log(`Added ${role.title} to the database`))
                .then(() => Initial())
          })
        })

      } else if (choice === "Remove Role") {
        db.AllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));
    
          prompt([
            {
              type: "list",
              name: "roleId",
              message:
                "Which role do you want to remove? (Warning: This will also remove employees)",
              choices: roleChoices
            }
          ])
            .then(res => db.removeRole(res.roleId))
            .then(() => console.log("Removed role from the database"))
            .then(() => initial())
        })

      } else if (choice === "View All Departments") {
        db.AllDepartments()
        .then(([rows]) => {
          let departments = rows;
          console.log("\n");
          console.table(departments);
        })
        .then(() => initial());

      } else if (choice === "Add Department") {
        prompt([
          {
            name: "name",
            message: "What is the name of the department?"
          }
        ])
          .then(res => {
            let name = res;
            db.createDepartment(name)
              .then(() => console.log(`Added ${name.name} to the database`))
              .then(() => initial())
          })

      } else if (choice === "Remove Department") {
        db.AllDepartments()
        .then(([rows]) => {
          let departments = rows;
          const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
          }));
    
          prompt({
            type: "list",
            name: "departmentId",
            message:
              "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
            choices: departmentChoices
          })
            .then(res => db.removeDepartment(res.departmentId))
            .then(() => console.log(`Removed department from the database`))
            .then(() => initial())
        })

      } else if (choice === "Quit") {
        console.log("Goodbye!");
        process.exit();
      }
        
    })
}

init();