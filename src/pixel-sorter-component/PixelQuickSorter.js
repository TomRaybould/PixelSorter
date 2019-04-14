
class PixelQuickSorter{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
        this.callStackCounter = 0;
    }

    sort = (arr) => {
        this.quickSort(arr, 0, arr.length - 1, 1, arr.length - 1);
    }

    quickSort = (arr, start, end, left, right) => {
        const pivot = start;
        
        if(start + 1 === left && end === right){
            this.callStackCounter++;
        }

        if(left > right){
            this.decreamentCallStackCounter();
            return;
        }
        
        let maxCompCount = 500;
        let compCount = 0;

        while(left < right && compCount < maxCompCount){

            while(arr[left].comparedTo(arr[pivot]) < 0 && left < right && compCount < maxCompCount){
                left ++;
                compCount++;
            } 
            while(arr[right].comparedTo(arr[pivot]) > 0 && left < right && compCount < maxCompCount){
                right --;
                compCount++;
            }
        
            if(arr[left].comparedTo(arr[pivot]) > 0 && arr[right].comparedTo(arr[pivot]) < 0 && left < right){
                this.swapPixels(left, right);
            }
            compCount++;

            if(compCount > maxCompCount && right - left > 50){
                break;
            }
        }

        if(left < right){
            
            const qSort = () =>{
                this.quickSort(arr, start, end, left, right);
            }
            
            window.setTimeout(qSort, 5);
            return;
        }

        let sortedIndex = 0;
        
        if(arr[pivot].comparedTo(arr[left]) > 0){
            sortedIndex = left;
        }
        else{
            sortedIndex = left - 1;
        }

        this.swapPixels(sortedIndex, pivot);
        
        this.quickSort(arr, start, sortedIndex - 1, start + 1, sortedIndex - 1);
        this.quickSort(arr, sortedIndex + 1, end, sortedIndex + 2, end);

        this.decreamentCallStackCounter();
    }

    decreamentCallStackCounter = () => {
        this.callStackCounter--;
        if(this.callStackCounter <= 0){
            this.onPixelsSorted();
        }
    }

}

export default PixelQuickSorter;