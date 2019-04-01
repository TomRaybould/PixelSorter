class PixelHeapSorter{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
    }

    sort = (arr) => {
        setTimeout(() => {
            this.buildMinHeap(arr, 0);
        }, 1000);
        
        this.onPixelsSorted();
    }

    buildMinHeap(arr, start){

        for(let i = start; i < arr.length; i++){
            this.siftUp(i, arr);
            
            if(i % 10000 === 0){
                const keepBuilding = () => {
                    this.buildMinHeap(arr, i + 1);
                }

                setTimeout(keepBuilding, 0);
                return;
            }
        
        }

        console.log(arr[0].truePosition);
    }
    

    heapify = (startPos, endPos, arr) => {

    }


    siftDown = (currPos, endPos, arr) => {
        const parent = arr[currPos];
        const leftChildPos  = 2 * currPos;
        const rightChildPos = (2 * currPos) + 1;

        if(leftChildPos <= endPos){
            const leftChild = arr[leftChildPos];   
            if(parent.comparedTo(leftChild) > 0){
                this.swapPixels(currPos, leftChildPos);
                this.siftDown(leftChildPos, endPos, arr);
                return;
            }
        }
        if(rightChildPos <= endPos){
            const rightChild = arr[rightChildPos];   
            if(parent.comparedTo(rightChild) > 0){
                this.swapPixels(currPos, rightChildPos);
                this.siftDown(rightChildPos, endPos, arr);
                return;
            }
        }

    }

    siftUp = (currPos, arr) => {
        if(currPos === 0){
            return;
        }
        const parentPos = Math.floor(currPos/2);
        const current = arr[currPos];
        const parent = arr[parentPos];

        if(parent.comparedTo(current) >= 0){
            this.swapPixels(currPos, parentPos);
            this.siftUp(parentPos, arr);
            return;
        }
        
    }

    
}

export default PixelHeapSorter;