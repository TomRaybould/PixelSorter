class InstantSorter{
    constructor(swapPixels, redraw, onPixelsSorted){
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onPixelsSorted = onPixelsSorted;
    }

    sort = (arr) => {
        for(let i = 0; i < arr.length; i++){
            console.log(i);
            while(arr[i].truePosition/4 !== i){  
                // console.log("while")
                // console.log(arr[i]. truePosition+", "+i); 
                this.swapPixels(arr[i].truePosition/4, i, true);
            }
        } 
        setTimeout(this.onPixelsSorted, 1000);
    }
    
}

export default InstantSorter;