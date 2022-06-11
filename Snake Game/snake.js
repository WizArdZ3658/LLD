export const DIRECTION = Object.freeze({
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
        this.body.enqueue({x, y})
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

export default Snake