// the Engineer class, inherits from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, github) {
        this.github = github;

        super(name, id, email);
    }

    getGithub() {
        return this.github
    }

    getRole() {
        return "Engineer"
    }
}

module.exports = Engineer;