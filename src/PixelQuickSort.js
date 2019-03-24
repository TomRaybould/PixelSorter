
class PixelQuickSort{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
    }

    quickSort = (arr, start, end, left, right) => {
        const pivot = start; 

        if(left > right){
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
            
            let sort = () =>{
                this.quickSort(arr, start, end, left, right);
            }
            
            window.setTimeout(sort, 5);
        
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

    }
}

export default PixelQuickSort;