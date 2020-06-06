const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Folder and File creation
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Render​
const render = require("./lib/htmlRenderer");

// General questions that will fe asked to all members of the team
const questionsAsked = teamMember => [
   {
      type: "input",
      name: "photo",
      message: `Add ${teamMember}'s photo?`
   },
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
   
      const { name, id, email, photo, officeNumber } = res;
      const manager = new Manager(name, id, email, photo, officeNumber);
      
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

      const { name, id, email, photo, github } = res;
      const engineer = new Engineer(name, id, email, photo, github);
      
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
   
      const { name, id, email, photo, school } = res;
      const intern = new Intern(name, id, email, photo, school);
      
      everyone.push(intern);
      idArr.push(id);
      
      newTeam()
   };

   // Question if user wants to continue adding members or if should create the new file
   const newTeam = async () => {
      const res = await inquirer.prompt([
         {
            type: "list",
            name: "chooseMember",
            message: `Who would you like to add now?`,
            choices: ["Engineer", "Intern", "I am done, no one else to add"]
         }
      ]);

      switch (res.chooseMember) {
         case "Engineer":
            newEngineer();
            break;
         
         case "Intern":
            newIntern();
            break;
      
         default:
            fs.writeFileSync(outputPath, render(everyone), "utf-8");
            break;
      }
   };

   newManager();
};

team();
