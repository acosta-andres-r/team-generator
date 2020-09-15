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
  
  //*** change method to be passed an argument 'member' and prompt question accordingly 
  //*** 'member' argument will be utilized in messages and in then pushing info to member property

  start() {

    // Ask for Manager
    inquirer
      .prompt([{
        type: 'input',
        name: 'name',
        message: "What is your manager's name?",
        // The name must contain only letters
        validate: val => /^[a-zA-Z\ ]+$/.test(val)
      },
      {
        type: 'input',
        name: 'id',
        message: "What is your manager's id?",
        // The id must contain only numbers
        validate: val => /^\d+$/.test(val)
      },
      {
        type: 'input',
        name: 'email',
        message: "What is your manager's email?",
        // The email must follow format: myaccount@provider.any
        // https://www.w3resource.com/javascript/form/email-validation.php
        validate: val => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "What is your manager's office number?",
        // The office number must contain only numbers
        validate: val => /^\d+$/.test(val)
        // Add a switch to validate input depending on team member:
        // manger: office number (number)
        // engineer: GitHub username (letter and special characters)
        // intern: school (letters and numbers /maybe apostrophy)
      }
      ])
      .then(({ name, id, email, officeNumber }) => {
        // Add user's answers to class property

        // *** this[member].push(......) to add member to corresponded property
        this.manager.push(new Manager(name, id, email, officeNumber));
        console.log(this.manager);

        // Prompt choices to add team member between engineer and intern
      })
      .catch(error => {
        console.error(error);
      });
  }

  quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
}

module.exports = Team