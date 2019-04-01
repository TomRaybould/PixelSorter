class PixelHeapSorter{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
    }

    sort = (arr) => {
        setTimeout(() => {
            this.buildMaxHeap(arr, 0);
        }, 1000);
        
        this.onPixelsSorted();
    }

    buildMaxHeap(arr, start){

        for(let i = start; i < arr.length; i++){
            this.siftUp(i, arr);
            
            if(i % 10000 === 0){
                const keepBuilding = () => {
                    this.buildMaxHeap(arr, i + 1);
                }

                setTimeout(keepBuilding, 0);
                return;
            }
        
        }

        console.log(arr[0].truePosition);
        this.heapify(arr, 0);
    }
    

    heapify = (arr, start) => {
        for(let i = start; i < arr.length; i++){
            //console.log(arr[arr.length - (i + 1)].truePosition);
            this.swapPixels(0, arr.length - (i + 1));
            //console.log("here");
            this.siftDown(0, arr.length - (i + 2), arr);
            
            if(i % 100 === 0){
                const keepBuilding = () => {
                    this.heapify(arr, i + 1);
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
    
        // console.log("parent : " + currPos);
        // console.log("left : " + leftChildPos);
        // console.log("right : " + rightChildPos);

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

            if(parent.comparedTo(arr[maxIndex]) < 0){
                this.swapPixels(currPos, maxIndex);
                this.siftDown(maxIndex, endPos, arr);
                return;
            }
        }

        if(leftChildPos <= endPos){
            const leftChild = arr[leftChildPos];   
            if(parent.comparedTo(leftChild) <= 0){
                this.swapPixels(currPos, leftChildPos);
                this.siftDown(leftChildPos, endPos, arr);
                return;
            }
        }

    }

   /*
    siftDown = (currPos, endPos, arr) => {
    
        while (currPos < endPos){
            console.log(currPos);
            console.log(arr[currPos].truePosition);
            let parent = arr[currPos];
            let leftChildPos  = 2 * currPos;
            let rightChildPos = (2 * currPos) + 1;

            if(leftChildPos <= endPos){
                const leftChild = arr[leftChildPos];   

                console.log("left: " +arr[currPos].truePosition);
                if(parent.comparedTo(leftChild) <= 0){
                    this.swapPixels(currPos, leftChildPos);
                    currPos = leftChildPos;
                    continue;
                }
            }
            if(rightChildPos <= endPos){
                const rightChild = arr[rightChildPos];   

                console.log("right: " +arr[currPos].truePosition);
                if(parent.comparedTo(rightChild) <= 0){
                    this.swapPixels(currPos, rightChildPos);
                    currPos = rightChildPos;
                    continue;
                }
            }
        
            break;

        }

    }
    */

    siftUp = (currPos, arr) => {
        if(currPos === 0){
            return;
        }
        const parentPos = Math.floor(currPos/2);
        const current = arr[currPos];
        const parent = arr[parentPos];

        if(parent.comparedTo(current) < 0){
            this.swapPixels(currPos, parentPos);
            this.siftUp(parentPos, arr);
            return;
        }
        
    }

    
}

export default PixelHeapSorter;