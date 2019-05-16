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
        this.imageData = [];
        this.pixels = [];
        this.drawBuffer = new Queue();
        this.shouldScramble = true;  
        this.pixelWidth = 1;
        this.pixelHeight = 1;
    }

    drawImage = () => {
        if(!this.imageFileUrl){
            this.imageFileUrl = 'pixel-sorter-logo.png'
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
        this.ctx = this.canvas.getContext('2d');
        this.ctx.drawImage(image, 0, 0);
        
        const imageData = this.ctx.getImageData(0, 0, image.width, image.height);

        this.imageData = imageData;
        
        this.processPixels();
    }

    processPixels = () => {
        const width = this.getPixelBlockPerRow();
        const height = this.getPixelBlockPerCol();
    
        const pixelArrLength = width * height;

        for(let i = 0; i < pixelArrLength; i++){
            const pixel = new Pixel();
            pixel.truePosition = i;
            this.pixels.push(pixel);
        }

        this.scramble();
        this.startRedraw();

    }

    getPixelBlockPerRow = () =>{
        return Math.floor(this.imageData.width / this.pixelWidth);
    }

    getPixelBlockPerCol = () =>{
        return Math.floor(this.imageData.height / this.pixelHeight);
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
        this.waitAfterScramble();
    } 


    waitAfterScramble(){
        if(this.drawBuffer.isEmpty()){
            if(this.loop){
                setTimeout(this.onWaitAfterScrambleFinished, this.afterSortDelay);
            }
        }
        else{
            const checkAgain = () => {
                this.waitAfterScramble();
            }
            setTimeout(checkAgain, 1);
        }
    }

    onWaitAfterScrambleFinished = () =>{
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

    convertPixelBlockPosToArrIndex = (pos) => {
        let pixelsPerRow = this.getPixelBlockPerRow() * this.pixelWidth;
        let leftOver = this.imageData.width - pixelsPerRow;
        pixelsPerRow += leftOver;

        const rowNum = Math.floor(pos / this.getPixelBlockPerRow());
        const colNum = Math.floor(pos % this.getPixelBlockPerRow());    

        const rowPixels = rowNum * pixelsPerRow * this.pixelHeight;
        const colPixels = colNum * this.pixelWidth;

        return ((rowPixels) + (colPixels)) * 4;
    }

    getPixelSectionIndexes = (arrPos) => {
        const result = [];
        
        const pixelPerRow = this.imageData.width;
        const indexesPerRow = pixelPerRow * 4;
        
        for(let row = 0; row < this.pixelHeight; row++){
            for(let col = 0; col < this.pixelWidth; col++){
                let pos = (indexesPerRow * (row)) + arrPos;
                pos += (col * 4);
                result.push(pos);
            }
        }

        return result;
    }

    swapPixelData = (swapObj) => {

        let ogIndex     = swapObj.ogIndex;
        let destIndex   = swapObj.destIndex;

        ogIndex     = this.convertPixelBlockPosToArrIndex(ogIndex);
        destIndex   = this.convertPixelBlockPosToArrIndex(destIndex);

        const rawData = this.imageData.data;
        
        const ogIndexes = this.getPixelSectionIndexes(ogIndex);
        const destIndexes = this.getPixelSectionIndexes(destIndex);
        
        for(let i = 0; i < ogIndexes.length; i++){
            
            const tempData = [];
            tempData[0] = rawData[destIndexes[i]];
            tempData[1] = rawData[destIndexes[i] + 1];
            tempData[2] = rawData[destIndexes[i] + 2];
            tempData[3] = rawData[destIndexes[i] + 3];
        
            rawData[destIndexes[i]]     = rawData[ogIndexes[i]];
            rawData[destIndexes[i] + 1] = rawData[ogIndexes[i] + 1];
            rawData[destIndexes[i] + 2] = rawData[ogIndexes[i] + 2];
            rawData[destIndexes[i] + 3] = rawData[ogIndexes[i] + 3];

            rawData[ogIndexes[i]]     = tempData[0];
            rawData[ogIndexes[i] + 1] = tempData[1];
            rawData[ogIndexes[i] + 2] = tempData[2];
            rawData[ogIndexes[i] + 3] = tempData[3];
        }
    }
    
    startRedraw(){
        this.readFromBuffer();
        this.redraw();
    }

    readFromBuffer = () =>{

        if(this.drawBuffer.getSize() > 0){

            const limit = Math.min(this.drawBuffer.getSize(), this.pixelsPerFrame); 

            for(let i = 0; i < limit; i ++){
                const swapObj = this.drawBuffer.dequeue();
                this.swapPixelData(swapObj);
            }
            
        }
        setTimeout(this.readFromBuffer, 4);
    }


    redraw = () => {
        this.ctx.putImageData(this.imageData, 0, 0);
        requestAnimationFrame(this.redraw);
    }

}

export default PixelSortCanvasDrawer;

