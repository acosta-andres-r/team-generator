const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "../output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");

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

    const lastQuestion = (member === 'manager') ? 'office number' : (member === 'engineer') ? 'Github username' : 'school';

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: `What is your ${member}'s name?`,
          default:'John Smith',
          // The name must contain only letters
          validate: val => /^[a-zA-Z\ ]+$/.test(val)
        },
        {
          type: 'input',
          name: 'id',
          message: `What is your ${member}'s id?`,
          default:'123',
          // The id must contain only numbers
          validate: val => /^\d+$/.test(val)
        },
        {
          type: 'input',
          name: 'email',
          message: `What is your ${member}'s email?`,
          default:'john_smith@gmail.com',
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
        this.storeMemberIntoProperty(member, answers);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Add user's answers to class property
   storeMemberIntoProperty(memberName, { name, id, email, lastInquiry }) {

    switch (memberName) {
      case 'manager':
        // Add member to corresponded property
        this.manager.push(new Manager(name, id, email, lastInquiry));
        break;
      case 'engineer':
        this.engineers.push(new Engineer(name, id, email, lastInquiry));
        break;
      case 'intern':
        this.interns.push(new Intern(name, id, email, lastInquiry));
        break;
      default:
        console.log('Team Member not found to store');
    }

    // Prompt choices to add team member between engineer and intern
    this.askForMoreMembers();
  }

  // Prompt if user needs to insert more members. If not, call to render HTML and passed it to write HTML
  askForMoreMembers() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: `Which type of team member would you like to add?`,
          choices: [
            'Engineer',
            'Intern',
            "I don't want to add any more team members"
          ]
        }
      ])
      .then(({ type }) => {
        // Call method to store user input to member's property
        // this.storeMemberIntoProperty(member, answers);
        console.log(type);

        switch (type.toLowerCase()) {
          case 'engineer':
            this.askForInfo('engineer');
            break;
          case 'intern':
            this.askForInfo('intern');
            break;
          case "I don't want to add any more team members".toLowerCase():
            // Join members
            this.createHTML(render([...this.manager, ...this.engineers, ...this.interns]));
            
            break;
          default:
            console.log('Team Member not found to store');
        }

      })
      .catch(error => {
        console.error(error);
      });
  }

  // Write HTML file wiht rendered block of code
  createHTML(htmlStr) {
    
    fs.writeFile(outputPath, htmlStr, (err) => {
      if (err) console.error(err);
    })

  }
}

module.exports = Team