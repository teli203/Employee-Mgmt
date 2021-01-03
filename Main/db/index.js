// Import dependencies //
const connection = require("connection"); 
const inquirer = require("inquirer");
const cTable = require("console.table");


// let db = new DB(department, role, employee) //
let department = new Department(name);
let role = new Role(title, salary, department_id);
let employee = new Employee(first_name, last_name, role_id, manager_id);

class DB { 
    constructor(department, role, employee) {
        this.department = department;
        this.role = role;
        this.employee = employee;
    }
};

class Department { 
    constructor(name) { 
        this.name = name;
    }

    // Prompt new dept //
    addDepartment() {
        inquirer.prompt([ 
            // Name of new department //
            {
                name: "name",
                type: "input",
                message: "What is the name of the new department?"
            }
        ]).then((data) => {
            const query = "INSERT INTO department SET ?"; 
            const values = { name: data.name }

            connection.query(query, values, (err, res) => {
              if (err) throw err;

              
              console.log("New department added to database!"); 
          });
      });
  };

  // dept view & error //
  viewDepartments() {
    const query = "SELECT * FROM department";

    connection.query(query, (err, res) => {
        if (err) throw err;

        const table = cTable.getTable(res);
        console.log(table);
    });
};

// Questions about dept type //
updateDepartment() { 
  inquirer.prompt([
      {
          name: "id",
          type: "input",
          message: "What's the id of the department you would like to update?"
      },
      {
          name: "name",
          type: "input",
          message: "What are you updating the department name to? "
      }
      // data .. //
    ]).then((data) => {
      const query = "UPDATE department SET ? WHERE ?"; 
      const values = [
          {
              name: data.name
          },
          {
              id: data.id
          }
      ];

      connection.query(query, values, (err, res) => { // copied same err throw from 51-55 //
          if (err) throw err;

          // this may not work //
          console.log("Department Updated");
      });
  });
};
// Deleted dept //
deleteDepartment() {
  inquirer.prompt([
      {
          name: "id",
          type: "input",
          message: "What's the ID of the department you would like to delete?" 
      }
  ]).then(data => {
      const query = "DELETE FROM WHICH department?";
      const values = { id: data.id };

      connection.query(query, values, (err, res) => {
          if (err) throw err;
          console.log("Your department has been deleted from the database.");
        });
    });


class Role {
  constructor(title, salary, department_id) { 
      this.title = title;
      this.salary = salary;
      this.department_id = department_id;
  }
// Add Role //
  addRole() { 
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What's the title of the new role you're adding?"
        },
        {
          name: "salary",
          type: "input",
          message:"What's the salary of the new role created?"
        },
        { 
          name: "department_id",
          type: "input",
          message: "What's the Department ID of new role?"
      
        }

    ]).then((data) => {
            const query = "INSERT INTO role SET ?"; 
            const values = {
                title: data.title,
                salary: data.salary,
                department_id: data.department_id
            };        

            connection.query(query, values, (err, res) => {
              if (err) throw err;

           console.log("Your new table has been added to the database!");
            });
        });
    };

    viewRoles() {
      const query = "SELECT * FROM role";
      connection.query(query, (err, res) => {
          if (err) throw err;

          const table = cTable.getTable(res);
          console.log(table);
      })
  };

  // Update //
  updateRole() {
      inquirer.prompt({
              name: "roleOptions",
              type: "rawlist",
              message: "What would you like to do?",
              choices: [
                  "Update role title",
                  "Update role salary",
                  "Update role department designation",
                  "back"
              ]
          }).then(onUpdateRole);
  }; 
// Switch //
  onUpdateRole({ roleOptions }) { 
      switch (roleOptions) {
          case "Update role title":
              this.updateRoleTitle();
              break;
          case "Update role salary":
              this.updateRoleSalary();
              break;
          case "Update role department designation":
            this.updateRoleDepartment();
            break;
        case "back":
        default: 
            mainPrompt();
            console.log("Trying to return to the main page!");
    }
}
// Title //
updateRoleTitle() {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What's the ID of the role you would like to update?"
    },
    {
      name:"title",
      type:"input",
      message:"What are you updating the title to?"
    }
  ]).then(data => {
    const query = "UPDATE role SET ? WHERE ?";
    const values = [
      { title: data.title },
      { id: data.id }
    ];

    connection.query(query, values, (err, res) => {
      if (err) throw err;

      console.log("You updated a role title.");
    });
  });
};
// Salary //
updateRoleSalary() {
  inquirer.prompt([
      {
          name: "id",
          input: "input",
          message: "What is the ID of the role you would like to update?"
      },
      {
          name: "salary",
          type: "input",
          message: "What would you like to update role salary to? "
      }
  ]).then(data => {
      const query = "UPDATE role SET ? WHERE ?";
      const values = [
          { salary: data.salary },
          { id: data.id }
      ];

      connection.query(query, values, (err, res) => {
          if (err) throw err;

          console.log("You updated a role salary.");
      });
  });
};

// Update Role //
updateRoleDepartment() {
  inquirer.prompt([
      {
          name: "id",
          type: "input",
          message: "What's the ID of the role you would like to update?"
      },
      {
          name: "department_id",
          type: "input",
          message: "What's the ID of the department you would like to designate the role to?" 
      }
  ]).then(data => {
      const query = "UPDATE role SET ? WHERE ?";
      const values = [
          { department_id: data.department_id },
          { id: data.id }
      ];

      connection.query(query, values, (err, res) => {
          if (err) throw err;

          
          console.log("You updated a role's department");
      });
  });
};

// Deleting a Role //
deleteRole() {
  inquirer.prompt([
      {
          name: "id",
          type: "input",
          message: "What's the ID of the role you would like to delete?"
      }
  ]).then(data => {
      const query = "DELETE FROM role WHERE ?";
      const values = { id: data.id }; 

      connection.query(query, values, (err, res) => {
          if (err) throw err;

          console.log("You deleted a role from the database.");
      });
  });
};
};

class Employee { 
  constructor(first_name, last_name, role_id, manager_id) { // might have to edited
      this.first_name = first_name;
      this.last_name = last_name;
      this.role_id = role_id;
      this.manager_id = manager_id;
  }

  // Adding an Employee //
  addEmployee() { 
      inquirer.prompt([
          {
              name: "first_name",
              type: "input",
              message: "First name? "
          },
          {
              name: "last_name",
              type: "input",
              message: "Last name? "
          },
          { 
              name: "role_id",
              type: "input",
              message: "What role does the employee have?"
          },
          { 
              name: "manager_id",
              type: "input",
              message: "Who is the employee's manager?" 
          }

        ]).then((data) => {
          const query = "INSERT INTO employee SET ?";
          const values = {
              first_name: data.first_name,
              last_name: data.last_name,
              role_id: data.role_id,
              manager_id: data.manager_id
          };

          connection.query(query, values, (err, res) => {
              if (err) throw err;

              console.log("You added a new employee to the database!");
          });
      });
  };

  // View Employees //
  viewEmployees() {
    inquirer.prompt({
        name: "byType",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View employees by department",
            "View employees by role",
            "View employees by manager",
            "back"
        ]
    }).then(onViewEmployees);
};

// On View of Employees "switch" //
onViewEmployees({ byType }) {
  switch (byType) {
      case "View all employees":
          this.viewAllEmployees;
          break;
      case "View employees by department":
          this.viewbyDept;
          break;
      case "View employees by role":
          this.viewByRole;
          break;
      case "View employees by manager":
          this.viewByManager;
          break;
      case "back":
      default:
          mainPrompt()
          console.log("Trying to return to the main page?");
  }
};
// View All //
viewAllEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
      if (err) throw err;

      const table = cTable.getTable(res);
      console.log(table);
  });
};

// View by Dept //
viewbyDept() { 
  const query = "trying to view employees by department";
  const baseQuery = `SELECT e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary, 
  CONCAT(e2.first_name, " ", e2.last_name) AS Manager 
  FROM employee AS e1
  LEFT JOIN role on e1.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee AS e2 ON e2.id=e1.manager_id
  ORDER BY department ASC;`;
  const queryOpt2 = `SELECT e.first_name, e.last_name, r.title, r.salary, 
  CONCAT(e1.first_name, " ", e1.last_name) as manager 
  FROM employee e
  INNER JOIN role r ON e.role_id = r.id 
  LEFT JOIN employee e1 ON e.manager_id = e1.id
  WHERE r.department_id = ?`;

  console.log(query);
}

// View by Mgr //
  viewByManager() {
    const query = "trying to view employees by manager";
    const queryOpt1 = `SELECT CONCAT(e2.first_name, " ", e2.last_name) AS Manager, e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary 
    FROM employee AS e1
    LEFT JOIN role on e1.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    INNER JOIN employee AS e2 on e2.id=e1.manager_id
    ORDER BY manager ASC;`;
    const queryOpt2 = `SELECT e.first_name, e.last_name, r.title, r.salary, 
    CONCAT(e1.first_name, " ", e1.last_name) as manager 
    FROM employee e
    INNER JOIN role r ON e.role_id = r.id 
    LEFT JOIN employee e1 ON e.manager_id = e1.id
    WHERE r.department_id = ?`;
   
    console.log(query);
  }
// View by Role //
    viewByRole() { 
      const query = "trying to view employees by role";
      console.log(query);
    }
// Update Employee by Options //
    updateEmployee() {
      inquirer.prompt({
              name: "employeeOptions",
              type: "rawlist",
              message: "What would you like to do?",
              choices: [
                  "Update employee name",
                  "Update employee's role",
                  "Update employee's manager",
                  "back"
              ]
      }).then(onUpdateEmployee);
  };

  onUpdateEmployee({ employeeOptions }) { 
    switch (employeeOptions) {
        case "Update employee name":
            this.updateName();
            break;
        case "Update employee's role":
            this.updateRole();
            break;
        case "Update employee's manager":
            this.updateManager();
            break;
        case "back":
        default:
            mainPrompt();
            console.log("Trying to return to the main page!");
    }
}

// Update by Name //
updateName() { 
  inquirer.prompt([
      {
          name: "id",
          type: "input",
          message: "What is the ID of the employee you would like to update?"
      },
      {
          name: "first_name",
          type: "input",
          message: "Update first name: "
      },
      {
          name: "last_name",
          type: "input",
          message: "Update last name: "
      }
  ]).then(data => {
      const query = "UPDATE employee SET ? WHERE ?"; 
      const values = [
          { 
              first_name: data.first_name,
              last_name: data.last_name 
          },
          { id: data.id }
      ];

      connection.query(query, values, (err, res) => {
          if (err) throw err;

          console.log("You updated an employee's name.");
        });
    });
};

// Update by Role //
updateRole() {
  inquirer.prompt([
      {
          name: "id",
          type: "input",
          message: "What is the ID of the employee you would like to update?"
      },
      {
          name: "role_id",
          type: "input",
          message: "What is the ID of the role you would like to update to?"
      }
  ]).then(data => {
      const query = "UPDATE employee SET ? WHERE ?";
      const values = [
          { role_id: data.role_id },
          { id: data.id }
      ];

      connection.query(query, values, (err, res) => {
          if (err) throw err;

          console.log("You've update the employee's role!");
      });
  });
};
// Update by Manager //
