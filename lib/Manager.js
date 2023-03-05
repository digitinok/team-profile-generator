// the Manager class, inherits from Employee.
const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, id, email, officeNumber) {
        this.officeNumber = officeNumber;

        super(name, id, email);
    }

    getOfficeNumber() {
        return this.officeNumber
    }

    getRole() {
        return "Manager"
    }
}

module.exports = Manager;