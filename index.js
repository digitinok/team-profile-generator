const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");




// gather information about the development team members, and render the HTML file.
// function to generate user prompts
const promptUser = (role="manager") => {
    const questionArray = [];
    const infoObj = {
        "manager": "Office Number",
        "engineer": "GitHub username",
        "intern": "School",
    }
    // array of questions for user
    const questions = [
        [`What is the name of the ${role}?`, "name", "input"],
        [`What is the employee ID of the ${role}?`, "id"],
        [`What is the email adress of the ${role}?`, "email"],
        [`What is the ${infoObj[role]}  of the ${role}?`, "info"],
        ["What do you would you like to do next?", "nextTask", "list"],
    ];
    
    for (let question of questions) {
        // create an array of objects with the questions
        const questionObject = {
            type: question[2],
            name: question[1],
            message: question[0],
        }
        // add a choices field for checkboxes or lists
        if (question[2] === "checkbox" || question[2] === "list") {
            questionObject.choices = ["Add an engineer", "Add an intern", new inquirer.Separator(), "Finish building the team"];
        }
        questionArray.push(questionObject);
    }
    return questionArray
}


// function to initialize program
const init = () => {
    // ask questions
    inquirer.prompt(promptUser())
        .then((data) => {
            console.log(data)
    }); 

};
    

// function call to initialize program
init();


