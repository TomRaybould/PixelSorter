
class PixelQuickSort{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
    }

    quickSort = (arr, start, end) => {
        const pivot = start; 
        
        let left = start + 1;
        let right = end;

        if(left > right){
            return;
        }
        while(left < right){

            while(arr[left].comparedTo(arr[pivot]) < 0 && left < right){
                left ++;
            } 
            while(arr[right].comparedTo(arr[pivot]) > 0 && left < right){
                right --;
            }
        
            if(arr[left].comparedTo(arr[pivot]) > 0 && arr[right].comparedTo(arr[pivot]) < 0 && left < right){
                this.swapPixels(left, right);
            }

        }

        let sortedIndex = 0;
        
        if(arr[pivot].comparedTo(arr[left]) > 0){
            sortedIndex = left;
        }
        else{
            sortedIndex = left - 1;
        }

        this.swapPixels(sortedIndex, pivot);
        
        this.quickSort(arr, start, sortedIndex - 1);
        this.quickSort(arr, sortedIndex + 1, end);

    }
}

export default PixelQuickSort;