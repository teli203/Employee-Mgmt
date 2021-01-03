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


