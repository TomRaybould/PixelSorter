
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
        
        let maxCount = 500;
        let count = 0;

        while(left < right){

            while(arr[left].comparedTo(arr[pivot]) < 0 && left < right){
                left ++;
                count++;
            } 
            while(arr[right].comparedTo(arr[pivot]) > 0 && left < right){
                right --;
                count++;
            }
        
            if(arr[left].comparedTo(arr[pivot]) > 0 && arr[right].comparedTo(arr[pivot]) < 0 && left < right){
                this.swapPixels(left, right);
            }

            if(count > maxCount){
                break;
            }
        }

        if(left < right){
            let sort = () =>{
                this.quickSort(arr, start, end, left, right);
            }
            window.setTimeout(sort, 10);
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
        
        const sort = () => {
            this.quickSort(arr, start, sortedIndex - 1, start + 1, sortedIndex - 1);
            this.quickSort(arr, sortedIndex + 1, end, sortedIndex + 2, end);
        }

        window.setTimeout(sort, 10);

    }
}

export default PixelQuickSort;