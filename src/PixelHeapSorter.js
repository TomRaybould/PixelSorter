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

            if(siftUpComparisons > 20000){
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

        let heapifyComparisons = 0;

        for(let i = start; i >= 0; i--){

            this.swapPixels(0, i);
            heapifyComparisons += this.siftDown(0, i - 1, arr);

            if(i === 0){
                this.onPixelsSorted();
                return;
            }

            if(heapifyComparisons > 20000){
                const keepBuilding = () => {
                    this.heapify(arr, i - 1);
                }
                
                setTimeout(keepBuilding, 0);
                return;
            }
            
        }

    }


    siftDown = (currPos, endPos, arr) => {
        let comparisons = 0;

        while(currPos < arr.length){
            let parent = arr[currPos];
            let leftChildPos  = (2 * currPos) + 1;
            let rightChildPos = (2 * currPos) + 2;
            
            comparisons++;
            if(leftChildPos <= endPos && rightChildPos <= endPos){
                let leftChild = arr[leftChildPos];
                let rightChild = arr[rightChildPos];
                let maxIndex;

                comparisons++;
                if(leftChild.comparedTo(rightChild) > 0){
                    maxIndex = leftChildPos;
                } 
                else{
                    maxIndex = rightChildPos;
                }
                comparisons++;
                if(arr[maxIndex].comparedTo(parent) > 0){
                    this.swapPixels(currPos, maxIndex);
                    currPos = maxIndex;
                    continue;
                }
            }
            
            comparisons++;
            if(leftChildPos <= endPos){
                const leftChild = arr[leftChildPos];   
                comparisons++;
                if(leftChild.comparedTo(parent) > 0){
                    this.swapPixels(currPos, leftChildPos);
                    currPos = leftChildPos;
                    continue;
                }
            }
            break;
        }

        return comparisons;

    }

    siftUp = (currPos, arr) => {
        let comparisons = 0;

        while(currPos > 0){
            const parentPos = Math.floor((currPos - 1) / 2);
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