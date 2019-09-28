
/**A function that takes a string and sees if it is 'loosely' 
 * formatted correctly
 * Note: it cannot see if the amount of coordinates is correct, 
 * nor can it check to see if a paretheses is put too early **/
const validateInput = function(input) {
    let errorFound, errorMessage;
    if (/[a-zA-Z!@#$%^&*~`/.:;_+=]/.test(input)) {
        errorFound = 1;
        errorMessage = "Invalid characters present";
    }
    else {
        errorFound = 0;
        errorMessage = 'valid expression';
    }
    let a = {
        error: errorFound,
        message: errorMessage
    };
    return a;
}


/**Runs an entire generation and returns a results object
 * which contains information about all the events of the 
 * generation **/
const evolve = function(rules, cells) {
    let el = rules[0];
    let eu = rules[1];
    let fl = rules[2];
    let fu = rules[3];

    let newCells = [];
    let count;
    let tempCells = [];
    let deadCells = 0;
    let birthedCells = 0;
    let unchangedCells = 0;
    /**Counting the neighbors for each cell **/
    for (let i = 0; i < cells.length; i++) {
        count = countNeighbors(cells, cells[i]);
        if (count >= el && count <= eu) {
            newCells.push(cells[i]);
            unchangedCells++;
        }
        else {
            deadCells++;
        }
    }
    
    /**Going through all neighboring empty cells and counting their neighbors **/
    
    for (let i = 0; i < cells.length; i++) {
        //Generate a list of neighboring cells
        tempCells = generate(cells[i]);
        for (let j = 0; j < tempCells.length; j++) {
            //Checking if the cell is empty
            if(owns(cells, tempCells[j])){
                //do nothing
            }
            else {
                count = countNeighbors(cells, tempCells[j]);
                if (count >= fl && count <= fu) {
                    newCells.push(tempCells[j]);
                    birthedCells++;
                }
                else {
                    //Do nothing
                }
            }
        }
    } 
    let results = {
        nextGen: newCells,
        deaths: deadCells,
        births: birthedCells,
        sustains: unchangedCells
    };
    return results;
}


//A function that checks the array of cells and 
//counts the number of neighbors of a single point
function countNeighbors(cells, cell) {
    let count = 0;
    let cellCheck = generate(cell);
    //Check a wide array of neighbors
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cellCheck.length; j++) {
            if (equate(cells[i], cellCheck[j])) {
                count++;
            }
        }
    }
    return count;
}

//An array of coordinates where if added to a single cell,
//generates the coordinates of all the cells of that neighbor
let neighCoords = [
    //Top layer
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, -1],
    [1, 1, 0],
    [-1, 1, 0],
    [1, 1, 1],
    [-1, 1, 1],
    [1, 1, -1],
    [-1, 1, -1],
    //Middle Layer
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
    [1, 0, 1],
    [1, 0, -1],
    [-1, 0, 1],
    [-1, 0, -1],
    //Bottom Layer
    [0, -1, 0],
    [0, -1, -1],
    [0, -1, 1],
    [1, -1, 0],
    [-1, -1, 0],
    [-1, -1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, -1, -1]
];

//A simple barebones add function for xyz coordinates
function add(a, b) {
    let c = [];
    c.push(a[0] + b[0]);
    c.push(a[1] + b[1]);
    c.push(a[2] + b[2]);
    return c;
}

//Checking to see if two cells are equal
function equate(a, b) {
    let truth = true;
    //This could be reduced to a single line, but 
    //I did this for the sake of readability
    if (a[0] !== b[0]) {
        truth = false
    }
    else if (a[1] !== b[1]) {
        truth = false;
    }
    else if (a[2] !== b[2]) {
        truth = false;
    }
    return truth;
}


//A function that takes a cell and generates all of the neighboring coordinates for an individual 
//cell
function generate(a) {
    let checkCells = [];
    for (let i = 0; i < neighCoords.length; i++) {
        checkCells.push(add(a, neighCoords[i]));
    }
    return checkCells;
}

//Checking to see if a certain cell is in the list of cells
function owns(cells, a) {
    let result = false;
    for (let i = 0; i < cells.length; i++) {
        if (equate(cells[i], a)) {
            result = true;
        }
    }
}

/**Generates an array of cells based on json passed in**/
function getCells(string) {
    let points = [];
    let loc = 0;
    let a = { errorMessage: '', errorFound: 0 };
    let invalidChars = validateInput(string);
    if (invalidChars.errorFound == 1) {
        a = invalidChars;
    }
    while (string.indexOf("(", loc) !== -1 && a.errorFound === 0) {

        let first = string.indexOf("(", loc);
        let second = string.indexOf(")", first + 1);

        let coord = string.substr(first + 1, second - first - 1);

        //Empty String
        if (coord.length === 0) {
            a.errorFound = 1;
            a.errorMessage = "Empty String";
        }
        let coordArray = JSON.parse("[" + coord + "]");
        //Checking for proper length
        //I'm not sure whether or not this checks against all invalid input
        //But I'm sure it covers a lot of cases.
        if (coordArray.length !== 3) {
            a.errorFound = 1;
            a.errorMessage = "Incorrect amount of coordinates";
        }

        loc = second + 1; //Make sure not to infinitely loop

        if (a.errorFound === 0) {
            points.push(coordArray);
        }
    }
    if (a.errorFound === 1) {
        //This is going to be type checked to adjust response header/body
        return a;
    }
    else {
        //This will be processed into graphics data
        return points;
    }
}

const test = function(a){
    console.log(a);
}

//Module to be exported, generate and getCells only.


exports.test = test => (console.log(test));
exports.charCheck = input => validateInput(input);
exports.generate = (rules, cells) => evolve(rules, cells);