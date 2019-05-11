import Pixel from './Pixel'
import Scrambler from './Scrambler'
import PixelQuickSorter from './PixelQuickSorter'
import PixelHeapSorter from './PixelHeapSorter'
import Queue from './Queue'
import InstantSorter from './InstantSorter';

class PixelSortCanvasDrawer {
    constructor(canvas, imageFileUrl, algo, loop){
        this.canvas = canvas;
        this.imageFileUrl = imageFileUrl;
        this.algo = algo;
        this.loop = loop;
        this.ctx = canvas.getContext('2d');
        this.imageData = [];
        this.pixels = [];
        this.drawBuffer = new Queue();
        this.shouldScramble = true;
        this.swapsPerFrameMax = 10000;  
        this.pixelWidth = 20;
    }

    drawImage = () => {
    
        if(!this.imageFileUrl){
            this.imageFileUrl = 'color_bars.png'
        }
        
        var loadImage = function (url, onImageLoaded) {
            var img = new Image();
            img.src = url
            img.onload = function () { 
                onImageLoaded(img);
            }
        }

        loadImage(this.imageFileUrl, this.processImageIntoPixelArray);

    }

    processImageIntoPixelArray = (image) => {
        this.resizeCanvas(image.width, image.height);
        this.ctx.drawImage(image, 0, 0);
        
        const imageData = this.ctx.getImageData(0, 0, image.width, image.height);

        this.imageData = imageData;
        
        this.processPixels();
    }

    processPixels = () => {
        
        const width = this.imageData.width;
        const height = this.imageData.height;
    
        for(let i = 0; i < height; i += this.pixelWidth){
            for(let j = 0; j < width; j += this.pixelWidth){
                
                const numPerRow = width / this.pixelWidth;
                let pos = numPerRow * (i === 0 ? 0 : i / this.pixelWidth);
                const posInRow = j === 0 ? 0 : j / this.pixelWidth;
                pos = pos + posInRow;

                const pixel = new Pixel();
                pixel.truePosition      = pos;
                pixel.currentPosition   = pos;
                this.pixels.push(pixel);
            }
        }

        this.scramble();
        this.startRedraw();

    }

    resizeCanvas = (width, height) => {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    scramble = () => {
        if(this.shouldScramble){
            const scrambler = new Scrambler(this.pixels.length, this.swapPixels, this.redraw, this.onScrambleFinished);
            scrambler.scramble();
        }
        else{
            this.onScrambleFinished();
        }
    }

    getSorter = () => {
        if(this.algo === 'heapSort'){
            return new PixelHeapSorter(this.swapPixels, this.redraw, this.onPixelsSorted);
        }
        else if (this.algo === 'quickSort'){
            return new PixelQuickSorter(this.swapPixels, this.redraw, this.onPixelsSorted);
        }
        else{
            return new InstantSorter(this.swapPixels, this.redraw, this.onPixelsSorted);
        }
    }

    onScrambleFinished = () => {  
        const sorter = this.getSorter();
        sorter.sort(this.pixels);
    } 

    onPixelsSorted = () => {
        this.waitAfterSorting();
    }

    waitAfterSorting(){
        if(this.drawBuffer.isEmpty()){
            if(this.loop){
                setTimeout(this.scramble, this.afterSortDelay);
            }
        }
        else{
            const checkAgain = () => {
                this.waitAfterSorting();
            }
            setTimeout(checkAgain, 1);
        }
    }

    swapPixels = (ogIndex, destIndex) => {
        const tempPixel         = this.pixels[ogIndex];
        this.pixels[ogIndex]    = this.pixels[destIndex];
        this.pixels[destIndex]  = tempPixel;

        this.drawBuffer.enqueue({ogIndex, destIndex});
    }

    convertRelativePosToArrIndex = (pos) => {
        const adjustedWidth = Math.floor(this.imageData.width / this.pixelWidth);

        const rowNum = Math.floor(pos / adjustedWidth);
        const colNum = Math.floor(pos % adjustedWidth);

        const pixelsPerRow = this.imageData.width;

        return ((rowNum * pixelsPerRow) + (colNum)) * this.pixelWidth * 4;
    }

    swapPixelData = (swapObj) => {

        let ogIndex     = swapObj.ogIndex;
        let destIndex   = swapObj.destIndex;

        ogIndex     = this.convertRelativePosToArrIndex(ogIndex);
        destIndex   = this.convertRelativePosToArrIndex(destIndex);

        if(ogIndex > this.imageData.data.length){
            console.log("over"+ ogIndex);
        }
        const rawData = this.imageData.data;
        
        const tempData = [];
        tempData[0] = rawData[destIndex];
        tempData[1] = rawData[destIndex + 1];
        tempData[2] = rawData[destIndex + 2];
        tempData[3] = rawData[destIndex + 3];

        rawData[destIndex]     = rawData[ogIndex];
        rawData[destIndex + 1] = rawData[ogIndex + 1];
        rawData[destIndex + 2] = rawData[ogIndex + 2];
        rawData[destIndex + 3] = rawData[ogIndex + 3];

        rawData[ogIndex]     = tempData[0];
        rawData[ogIndex + 1] = tempData[1];
        rawData[ogIndex + 2] = tempData[2];
        rawData[ogIndex + 3] = tempData[3];
    }
    
    startRedraw(){
        this.readFromBuffer();
        this.redraw();
    }

    readFromBuffer = () =>{

        if(this.drawBuffer.getSize() > 0){

            const limit = Math.min(this.drawBuffer.getSize(), this.swapsPerFrameMax); 

            for(let i = 0; i < limit; i ++){
                const swapObj = this.drawBuffer.dequeue();
                this.swapPixelData(swapObj);
            }
            
        }
        setTimeout(this.readFromBuffer, 5);
    }


    redraw = () => {
        this.ctx.putImageData(this.imageData, 0, 0);
        requestAnimationFrame(this.redraw);
    }

}

export default PixelSortCanvasDrawer;

