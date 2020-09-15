const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
// const chalk = require("chalk");

class Team {
  // Save a reference for team members and 'this' will be changed inside inquirer
  constructor() {
    this.manager = [];
    this.engineers = [];
    this.interns = [];
  }
  // Start by prompting the user for manager


  start() {
    //Method to be passed an argument 'member' and prompt question accordingly 
    // First, Ask for Manager
    this.askForInfo('manager')
  }

  askForInfo(member) {
    // 'member' argument will be utilized in messages 
    // and in 'then' pushing info to member property

    const lastQuestion = (member==='manager') ? 'office number':(member==='engineer') ? 'Github username': 'school';

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: `What is your ${member}'s name?`,
          // The name must contain only letters
          validate: val => /^[a-zA-Z\ ]+$/.test(val)
        },
        {
          type: 'input',
          name: 'id',
          message: `What is your ${member}'s id?`,
          // The id must contain only numbers
          validate: val => /^\d+$/.test(val)
        },
        {
          type: 'input',
          name: 'email',
          message: `What is your ${member}'s email?`,
          // The email must follow format: myaccount@provider.any
          // https://www.w3resource.com/javascript/form/email-validation.php
          validate: val => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)
        },
        {
          type: 'input',
          name: 'lastInquiry',
          message: `What is your ${member}'s ${lastQuestion}?`,
          validate: val => {
            switch (member) {
              case 'manager':
                // The office number must contain only numbers
                return /^\d+$/.test(val);
                break;
              case 'engineer':
                // The GitHub username must contain letter, numbers and special characters
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(val);
                break;
              case 'intern':
                // The school must contain letters, numbers and apostrophy
                return /^[a-zA-Z0-9'\ ]+$/.test(val);
                break;
              default:
                console.log('Team Member not registered');
            }
          }
        }
      ])
      .then((answers) => {
        // Call method to store user input to member's property
        this.storeMemberIntoProperty(member, answers)
      })
      .catch(error => {
        console.error(error);
      });
  }

  storeMemberIntoProperty(memberName, { name, id, email, lastInquiry }) {
    // Add user's answers to class property

    // *** this[member].push(......) to add member to corresponded property
    this[memberName].push(new Manager(name, id, email, lastInquiry));
    console.log(this.manager);

    // Prompt choices to add team member between engineer and intern
  }

  quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
}

module.exports = Team