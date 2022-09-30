const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid () {
    //create 100 of these elements with a for loop
    for (let i = 0; i < width*width; i++) {
    //create elements
    const square = document.createElement("div");
    // add stylying to these elements
    square.classList.add("square");
    // put the element into our grid
    grid.appendChild(square);
    // create array of squares
    squares.push(square);
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add("snake"));

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(timerId);
    currentSnake = [2,1,0];
    score = 0;
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    generateApples()
    timerId = setInterval(move, intervalTime);
}

startBtn.addEventListener("click", startGame)

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) ||   //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right
        (currentSnake[0] % width === 0 && direction === - 1) || //if snake has hit left
        (currentSnake[0] - width < 0 && direction === - width) || // if snake has hit top

        squares[currentSnake[0] + direction].classList.contains("snake")
    )
    return clearInterval(timerId);

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake");
    // add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    // add styling so we can see it
    squares[currentSnake[0]].classList.add("snake");
   
    // deal with snake head getting the apple 
    if (squares[currentSnake[0]].classList.contains("apple")) {
        // remove the class of apple
        squares[currentSnake[0]].classList.remove("apple")
        // grow out snake by adding class of snake on it
        squares[tail].classList.add("snake");
        // grow our snake array
        currentSnake.push(tail);
        console.log(currentSnake)
        // generate a new apple
        generateApples()
        // add one to the score
        score++
        // display our score
        scoreDisplay.textContent = score;
        // speed our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);

    }
}

function generateApples() {
    do {
       appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}

generateApples()

// clearInterval(timerId)

function control(e) {
    if (e.keyCode === 39) {
    console.log("right pressed")
    direction = 1;
    } else if (e.keyCode === 38) {
        console.log("up pressed")
        direction = - width;
    } else if (e.keyCode === 37) {
        console.log("left pressed") 
        direction = - 1;
    } else if (e.keyCode === 40) {
        console.log("down pressed")
        direction = width;
    }
}

document.addEventListener("keydown", control)


const checkEl = document.getElementById("check")
checkEl.addEventListener("click", function() {
    console.log(currentSnake)
})





function howMuch(cost) {
    if (cost < 10) {
        return "yes"
    } else if (cost < 20) {
    return "maybe"
} else if (cost < 30 || cost < 40) {
    return "no, I think"
}
else {
    return "never"
}
}

console.log(howMuch(40))