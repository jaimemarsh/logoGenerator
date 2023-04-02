
const files = require('fs');
const { writeFile } = require('fs/promises');
const SVG = require('./shapes.js');
const { Cricle, Square, Triangle } = require('./shapes.js');

class Svg {
    constructor() {
        this.textElement = "";
        this.shapeElement = "";
    }
    render() {
        return `svg version="1.1" xmlns="http://www.w3.org/200/svg" width="300" height="200" viewBox="0 0 `
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="30" fill="${color}">${text}</text>`
    }
    setShapeElement(shape, color) {
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
        name: "color",
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
        name: "color",
        message: "Choose the shapes color, or a hexadecimal number:",

    },
]