class InstantSorter{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
    }

    sort = (arr) => {
        for(let i = 0; i < arr.length; i++){
            while(arr[i].truePosition !== i){  
                this.swapPixels(arr[i].truePosition, i, true);
            }
        } 
        setTimeout(this.onPixelsSorted, 1000);
    }
    
}

export default InstantSorter;