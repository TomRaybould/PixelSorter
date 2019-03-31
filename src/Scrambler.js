
class Scrambler {
    constructor(pixels, swapPixels, redraw, onScrambleDone){
        this.pixels = pixels;
        this.swapPixels = swapPixels;
        this.redraw = redraw;
        this.onScrambleDone = onScrambleDone;
        this.count = 0;
    }

    scramble = () => {
        if(this.count > 100){
            this.onScrambleDone();
            return;
        }
        
        for(let i = 0; i < 10000; i++){
            const index1 = Math.floor(Math.random() * this.pixels.length);
            const index2 = Math.floor(Math.random() * this.pixels.length);
            this.swapPixels(index1, index2);
        }

        this.count++;

        this.redraw();

        setTimeout(this.scramble, 0);

    }

}

export default Scrambler;