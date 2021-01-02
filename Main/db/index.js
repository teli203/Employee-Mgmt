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

// Questions //
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
