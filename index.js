const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//const util = require('util');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { truncate } = require("fs/promises");

// write html file
//const writeFileAsync = util.promisify(fs.writeFile);


// function to generate questions about development team
const questionData = (role="manager") => {
    // role based fields 
    const infoObj = {
        "manager": "Office Number",
        "engineer": "GitHub username",
        "intern": "School",
    }
    // array of questions for user
    const questionArray = [
        [`What is the name of the ${role}?`, "name", "input"],
        [`What is the employee ID of the ${role}?`, "id"],
        [`What is the email adress of the ${role}?`, "email"],
        [`What is the ${infoObj[role]}  of the ${role}?`, "info"],
        ["What do you would you like to do next?", "nextTask", "list", ["Add an engineer", "Add an intern", new inquirer.Separator(), "Finish building the team"]],
    ];
    return questionArray
}

// gather information about the development team members, and render the HTML file.
// function to generate user prompts
const promptUser = (role="manager") => {
    const questionArray = [];
    const questions = questionData(role);
    
    for (let question of questions) {
        // create an array of objects with the questions
        const questionObject = {
            type: question[2],
            name: question[1],
            message: question[0],
            validate: answer => {
                if (answer.trim() !== "") {
                    return true
                }
                return "Please enter at least one character!"
            }
        }
        // add a choices field for checkboxes or lists
        if (question[2] === "checkbox" || question[2] === "list") {
            questionObject.choices = question[3];
        }
        questionArray.push(questionObject);
    }
    return inquirer.prompt(questionArray);
}


// function to initialize program
const init = async () => {
    // empty team array to collect all the team members
    const team = [];

    try {
        // promt for the manager
        let answers = await promptUser();
        team.push(new Manager(answers.name, answers.id, answers.email, answers.info));
        // prompt for further team members
        while (answers.nextTask !==  "Finish building the team") {

            if (answers.nextTask === "Add an engineer") {
                answers = await promptUser("engineer");
                team.push(new Engineer(answers.name, answers.id, answers.email, answers.info));
            } else if (answers.nextTask === "Add an intern") {
                answers = await promptUser("intern");
                team.push(new Intern(answers.name, answers.id, answers.email, answers.info));
            }
        }
        // render the html code with all the team members
        const html = render(team);
        console.log(html)

        // check if the output directory exist, otherwise create it.
        if (!fs.existsSync(OUTPUT_DIR )) {
            fs.mkdirSync(OUTPUT_DIR)
            console.log(OUTPUT_DIR, "created!")
        }
        fs.writeFileSync(outputPath, html, "utf-8");

        console.log('Successfully wrote the team.html');
    } catch (err) {
        console.log(err);
    }
};
    

// function call to initialize program
init();


