const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Folder and File creation
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Render​
const render = require("./lib/htmlRenderer");

// General questions that will fe asked to all members of the team
const questionsAsked = teamMember => [
   {
      type: "input",
      name: "name",
      message: `What is your ${teamMember}'s name?`
   },
   {
      type: "input",
      name: "id",
      message: `What is your ${teamMember}'s id?`
   },
   {
      type: "input",
      name: "email",
      message: `What is your ${teamMember}'s email?`
   }
];

// Arrays to store members of the team and their Ids
const everyone = [];
const idArr = [];


// Creation of each member and their specific questions
const team = () => {
   const newManager = async () => {
      const res = await inquirer.prompt
         ([...questionsAsked("manager"),
            {
               type: "input",
               name: "officeNumber",
               message: `What is your Manager's office number?`
            }
         ]);
   
      const { name, id, email, officeNumber } = res;
      const manager = new Manager(name, id, email, officeNumber);
      
      everyone.push(manager);
      idArr.push(id);
      
      newTeam();
   };

   const newEngineer = async () => {
      const res = await inquirer.prompt
         ([...questionsAsked("engineer"),
            {
               type: "input",
               name: "github",
               message: `What is your Engineer's GitHub username?`
            }
         ]);

      const { name, id, email, github } = res;
      const engineer = new Engineer(name, id, email, github);
      
      everyone.push(engineer);
      idArr.push(id);

      newTeam();
   }; 
   
   const newIntern = async () => {
      const res = await inquirer.prompt
         ([...questionsAsked("intern"),
         {
            type: "input",
            name: "school",
            message: `What is the name of your Intern's school?`
         }
      ]);
   
      const { name, id, email, school } = res;
      const intern = new Intern(name, id, email, school);
      
      everyone.push(intern);
      idArr.push(id);
      
      newTeam()
   };

   // Question if user wants to continue adding members or if should create the new file

};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
