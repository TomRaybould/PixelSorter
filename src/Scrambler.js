
class Scrambler {
    constructor(pixels, swapPixels, redraw){
        this.pixels = pixels;
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.count = 0;
    }

    scramble = () => {
        if(this.count > 500){
            return;
        }
        
        for(let i = 0; i < 10000; i++){
            const index1 = Math.floor(Math.random() * this.pixels.length);
            const index2 = Math.floor(Math.random() * this.pixels.length);
            this.swapPixels(index1, index2);
        }

        this.redraw();

        setTimeout(this.scramble, 0);

    }

}

export default Scrambler;