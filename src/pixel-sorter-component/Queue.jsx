

class Queue{
    constructor(){
        this.front = null;
        this.end = null;
        this.size = 0;
    }

    getSize = () => {
        return this.size;
    }

    isEmpty = () => {
        return this.size < 1
    }

    enqueue = (element) => {
        this.size++;
        if(this.front == null){
            this.end = {
                element : element,
                next : null
            }
            this.front = this.end;
        }
        else{
            this.end.next = {
                element : element,
                next : null
            }
            this.end = this.end.next;
        }
    }

    dequeue = () => {
        this.size--;
        const element = this.front.element;

        if(this.front === this.end){
            this.front = null;
            this.end = null;
            return element;
        }
        else{
            this.front = this.front.next;
        }

        return element;
    }

}

module.exports = Queue;