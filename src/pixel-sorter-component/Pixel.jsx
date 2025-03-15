
class Pixel {

    constructor () {
        //The original position of the pixel before any scrambling
        this.truePosition = 0;
        this.currentPosition = 0;
    }
    
    comparedTo = (another) =>{
        return this.truePosition - another.truePosition;
    }

}

export default Pixel;