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

window.onload = () => {
    loop();
}

function loop() {
    setInterval(show, 1000/20);
}

function show() {
    console.log("Loading Frame...")
    ctx.clearRect(0,0,board.width, board.height);
    snake.moveSnake()
    draw(snake);
}

ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, 400, 400);

const snake = new Snake(5, 5)

function createRect(x,y,width, height,color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

function draw(snake) {
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)

    for (let i = 0; i < snake.body.length; i++){
        createRect(snake.body[i].x + 2.5, snake.body[i].y + 2.5,
            snake.size - 5, snake.size- 5, "white")
    }

    ctx.font = "20px Arial"
    ctx.fillStyle = "#00FF42"
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37 && snake.direction != DIRECTION.LEFT) {
            snake.rotateX = -1
            snake.rotateY = 0
        } else if (event.keyCode == 38 && snake.rotateY != DIRECTION.UP) {
            snake.rotateX = 0
            snake.rotateY = -1
        } else if (event.keyCode == 39 && snake.rotateX != DIRECTION.RIGHT) {
            snake.rotateX = 1
            snake.rotateY = 0
        } else if (event.keyCode == 40 && snake.rotateY != DIRECTION.DOWN) {
            snake.rotateX = 0
            snake.rotateY = 1
        }
    }, 1)
})