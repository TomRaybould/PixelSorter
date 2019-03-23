
class Scrambler {
    constructor(pixels, swapPixels){
        this.pixels = pixels;
        this.swapPixels = swapPixels;
        this.count = 0;
        this.currPixel = 0;
    }

    scramble = () => {
        if(this.count > 1000){
            return;
        }
        
        for(let i = 0; i < 5000; i++){
            const index1 = Math.floor(Math.random() * this.pixels.length);
            const index2 = Math.floor(Math.random() * this.pixels.length);
            this.swapPixels(this.count, index2);
        }
        
        this.currPixel ++;

        setTimeout(this.scramble, 0);

    }

}

export default Scrambler;