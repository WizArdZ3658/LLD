const DIRECTION = Object.freeze({
    UP: 'UP',
    LEFT: 'LEFT',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT'
})

class Queue
{
    constructor() {
        this.items = [];
    }
                  
    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if(this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    back() {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    front() {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length == 0;
    }

    printQueue() {
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    }
}

class Snake {
    body = new Queue()
    size = 1;
    direction = DIRECTION.DOWN;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.body.enqueue({
            x : this.x, 
            y : this.y
        })
    }

    getEndIndexes() {
        const endIndexes = this.body.back();
        return {
            x: endIndexes.x,
            y: endIndexes.y
        }
    }

    getStartIndexes() {
        const startIndexes = this.body.front();
        return {
            x: startIndexes.x,
            y: startIndexes.y
        }
    }

    moveSnake() {
        const index = this.body.dequeue();
        index.x += 1;
        this.body.enqueue({index});
    }
}

const board = document.getElementById("canvas")
const ctx = board.getContext('2d');

ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, 400, 400);

 // set line stroke and line width
// ctx.strokeStyle = 'white';
// ctx.lineWidth = 5;
const snake = new Snake(100, 100)

function moveLine(snake) {
    snake.moveSnake()
}

function draw(snake) {
    const startingIndexes = snake.getStartIndexes()
    const endingIndexes = snake.getEndIndexes()
    ctx.beginPath();
    ctx.moveTo(startingIndexes.x, startingIndexes.y);
    ctx.lineTo(endingIndexes.x, endingIndexes.y);
    ctx.stroke();
}

function show() {
    ctx.clearRect(0,0,board.width, board.height);
    moveLine(snake);
    draw(snake);
}

function loop() {
    console.log("Loading Frame...")
    setInterval(show, 1000/20);
}

window.onload = () => {
    loop();
}
// window.requestAnimationFrame(loop)