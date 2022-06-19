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
        this.body.enqueue({
            x : x, 
            y : y
        })
    }

    setDirection(direction) {
        this.direction = direction
    }

    getEndIndexes() {
        const endIndexes = this.body.back();
        return endIndexes
    }

    getStartIndexes() {
        const startIndexes = this.body.front();
        return startIndexes
    }

    moveSnake() {
        const startIndexes = this.body.front();
        const index = this.body.dequeue();
        if (this.direction == DIRECTION.DOWN) {
            index.y = startIndexes.y + 1;
        } else if (this.direction == DIRECTION.LEFT) {
            index.x = startIndexes.x - 1;
        } else if (this.direction == DIRECTION.RIGHT) {
            index.x = startIndexes.x + 1;
        } else {
            index.y = startIndexes.y - 1;
        }
        this.body.enqueue(index);
    }
}

const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext('2d');

window.onload = () => {
    gameLoop();
}

function gameLoop() {
    setInterval(show, 1000/1);
}

function show() {
    console.log("Loading Frame...")
    // update
    canvasContext.clearRect(0,0,canvas.width, canvas.height);
    snake.moveSnake()
    // checkHitWall()

    // draw
    draw(snake);
}

canvasContext.fillStyle = '#000000';
canvasContext.fillRect(0, 0, 400, 400);

const snake = new Snake(5, 5)

function createRect(x,y,width, height,color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

function checkHitWall() {
    let headTail = snake.getStartIndexes()

    if (headTail.x == - snake.size) {
        headTail.x = canvas.width - snake.size
    } else if (headTail.x == canvas.widh) {
        headTail.x = 0
    } else if (headTail.y == - snake.size) {
        headTail.y = canvas.height - snake.size
    } else if (headTail.y == canvas.height) {
        headTail.y = 0 
    }
}

function draw(snake) {
    createRect(0,0, canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)

    for (let i = 0; i < snake.body.items.length; i++){
        createRect(snake.body.items[i].x, snake.body.items[i].y, 5, 5, "white")
    }
}

window.addEventListener('keydown', function (event) {
    setTimeout(function () {
        const key = event.key
        switch (key) {
            case 'ArrowUp':
                snake.setDirection(DIRECTION.UP)
                break;
            case 'ArrowDown':
                snake.setDirection(DIRECTION.DOWN)
                break;
        
            case 'ArrowLeft':
                snake.setDirection(DIRECTION.LEFT)
                break;
        
            case 'ArrowRight':
                snake.setDirection(DIRECTION.RIGHT)
                break;
        
            default:
                event.preventDefault()
                break;
        }
    }, 1)
})