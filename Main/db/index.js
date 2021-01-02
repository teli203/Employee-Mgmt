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
