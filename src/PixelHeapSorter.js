class PixelHeapSorter{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
    }

    sort = (arr) => {
        this.buildMaxHeap(arr, 0);    
        this.onPixelsSorted();
    }

    buildMaxHeap(arr, start){

        for(let i = start; i < arr.length; i++){
            this.siftUp(i, arr);
            
            if(i % 1 === 1000){
                const keepBuilding = () => {
                    this.buildMaxHeap(arr, i + 1);
                }

                setTimeout(keepBuilding, 0);
                return;
            }
        
        }
        this.heapify(arr, arr.length - 1);
    }
    

    heapify = (arr, start) => {
        for(let i = start; i >= 0 ; i--){

            this.swapPixels(0, i);
            this.siftDown(0, i - 1, arr);

            if(i % 1000 === 0){
                const keepBuilding = () => {
                    this.heapify(arr, i - 1);
                }
                
                setTimeout(keepBuilding, 0);
                return;
            }
            
        }

    }


    siftDown = (currPos, endPos, arr) => {

        const parent = arr[currPos];
        const leftChildPos  = (2 * currPos) + 1;
        const rightChildPos = (2 * currPos) + 2;

        if(leftChildPos <= endPos && rightChildPos <= endPos){
            const leftChild = arr[leftChildPos];
            const rightChild = arr[rightChildPos];
            let maxIndex;

            if(leftChild.comparedTo(rightChild) > 0){
                maxIndex = leftChildPos;
            } 
            else{
                maxIndex = rightChildPos;
            }

            if(arr[maxIndex].comparedTo(parent) > 0){
                this.swapPixels(currPos, maxIndex);
                this.siftDown(maxIndex, endPos, arr);
                return;
            }
        }

        if(leftChildPos <= endPos){
            const leftChild = arr[leftChildPos];   
            if(leftChild.comparedTo(parent) > 0){
                this.swapPixels(currPos, leftChildPos);
                this.siftDown(leftChildPos, endPos, arr);
                return;
            }
        }

    }

    siftUp = (currPos, arr) => {
        if(currPos === 0){
            return;
        }
        const parentPos = Math.floor((currPos - 1)/2);
        const current = arr[currPos];
        const parent = arr[parentPos];

        if(parent.comparedTo(current) <=  0){
            this.swapPixels(currPos, parentPos);
            this.siftUp(parentPos, arr);
            return;
        }
        
    }

    
}

export default PixelHeapSorter;