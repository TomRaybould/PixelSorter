class PixelHeapSorter{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
    }

    sort = (arr) => {
        this.buildMaxHeap(arr, 0);   
    }

    buildMaxHeap(arr, start){
        
        let siftUpComparisons = 0;
        for(let i = start; i < arr.length; i++){
            siftUpComparisons += this.siftUp(i, arr);

            if(siftUpComparisons > 10000){
                const keepBuilding = () => {
                    this.buildMaxHeap(arr, i + 1);
                }
                setTimeout(keepBuilding, 1);
                return;
            }

        }
        this.heapify(arr, arr.length - 1);
    }
    
    heapify = (arr, start) => {
        for(let i = start; i >= 0; i--){

            this.swapPixels(0, i);
            this.siftDown(0, i - 1, arr);

            if(i === 0){
                this.onPixelsSorted();
                return;
            }

            if(i % 100 === 0){
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
        let comparisons = 0;

        if(currPos === 0){
            return comparisons;
        }

        while(currPos > 0){
            const parentPos = Math.floor((currPos - 1)/2);
            const current = arr[currPos];
            const parent = arr[parentPos];
            
            comparisons++;

            if(parent.comparedTo(current) <=  0){
                this.swapPixels(currPos, parentPos);
                currPos = parentPos;
            }
            else{
                break;
            }
        }
        return comparisons;
    }

    
}

export default PixelHeapSorter;