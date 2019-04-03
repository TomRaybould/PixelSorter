

class Queue{
    constructor(){
        this.front = null;
        this.end = null;
        this.empty = true;
    }

    isEmpty = () => {
        return this.isEmpty;
    }

    enqueue = (element) => {
        this.empty = false;
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
        const element = this.front;

        if(this.front === this.end){
            this.empty = true;
            this.front = null;
            this.end = null;
            return element;
        }
        else{
            this.front = this.front.next; 
        }

        return element;
    }

    print = () => {
        let ptr = this.front;
        let string = "";
        while(ptr != null){
            console.log(ptr);
            ptr = ptr.next;
        }
    }

}

export default Queue;