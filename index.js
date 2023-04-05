const inquirer = require('inquirer');
const files = require('fs');
const SVG = require('./lib/shapes.js');
const { Circle, Square, Triangle } = require('./lib/shapes.js');


class Svg {
    constructor() {
        this.textElement = "";
        this.shapeElement = "";
    }
    render() {
        return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg" >${this.shapeElement} ${this.textElement}</svg>`;
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="30" fill="${color}">${text}</text>`
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render()
    }
}

//questions for user input

const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter up to three characters:",
        validate: (textChoice) =>
            textChoice.length <= 3 || "Text must be less than 3 characters"
    },
    {
        type: "input",
        name: "textColor",
        message: "Choose a text color, or a hexadecimal number:",

    },
    {
        type: "list",
        name: "shape",
        message: "Choose a shape:",
        choices: ["circle", "triangle", "square"]
    },
    {
        type: "input",
        name: "shapeColor",
        message: "Choose the shapes color, or a hexadecimal number:",

    },
]

//function to write to file
function writeToFile(fileName, data) {
    files.writeFile(fileName, data, (err) => {
        if (err) throw error
    })
    console.log("You have generated a new logo!")
}
async function init() {
    let svgString;
    const answers = await inquirer.prompt(questions);
    const shapeColor = answers.shapeColor;
    const textColor = answers.textColor;
    let userText

    if (answers.text.length > 0 && answers.text.length < 4) {
        userText = answers.text
    } else {
        console.log("Invalid, input must be three characters or less")
        return
    }

    let userShape
    if (answers.shape === "circle") {
        userShape = new Circle()
    } else if (answers.shape === "triangle") {
        userShape = new Triangle()
    } else if (answers.shape === "square") {
        userShape = new Square()
    } else {
        console.log("Invalid, choose a shape")
        return
    }
    userShape.setColor(shapeColor)
    console.log(userText)
    let svg = new Svg();
    svg.setTextElement(userText, textColor)
    svg.setShapeElement(userShape)
    svgString = svg.render()

    writeToFile("logo.svg", svgString)
}

init();