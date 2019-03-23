
class Scrambler {
    constructor(pixels, swapPixels, redraw){
        this.pixels = pixels;
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.count = 0;
        this.currPixel = 0;
    }

    scramble = () => {
        if(this.count > 500){
            return;
        }
        
        for(let i = 0; i < 1000; i++){
            const index1 = Math.floor(Math.random() * this.pixels.length);
            const index2 = Math.floor(Math.random() * this.pixels.length);
            this.swapPixels(index1, index2);
        }

        this.redraw();
        
        this.currPixel ++;

        setTimeout(this.scramble, 0);

    }

}

export default Scrambler;