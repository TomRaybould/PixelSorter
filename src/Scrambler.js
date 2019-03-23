
class Scrambler {
    constructor(pixels, swapPixels){
        this.pixels = pixels;
        this.swapPixels = swapPixels;
        this.currPixel = 0;
    }

    scramble = () => {
        if(this.currPixel > this.pixels.length){
            return;
        }
        const index = Math.floor(Math.random() * this.pixels.length);
        this.swapPixels(this.currPixel, index);
        this.currPixel ++;
        
        setTimeout(this.scramble, 0);

    }

}

export default Scrambler;