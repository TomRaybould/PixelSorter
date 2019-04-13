import Pixel from './Pixel'
import Scrambler from './Scrambler'
import PixelQuickSorter from './PixelQuickSorter'
import PixelHeapSorter from './PixelHeapSorter'
import Queue from './Queue'

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

        let startIndex = this.pixels.length ? this.pixels.length : 0;
        
        startIndex = startIndex * 4;

        const sectionLength = startIndex + (1000 * 4);

        for(let i = startIndex; i < sectionLength; i += 4){
            startIndex = i;

            if(startIndex + 3 > this.imageData.data.length){
                break;
            }

            const pixelPosition = i;
            const pixel = new Pixel();
            
            pixel.truePosition      = pixelPosition;
            pixel.currentPosition   = pixelPosition;
            
            this.pixels.push(pixel);
            
        }

        if(startIndex + 3 >= this.imageData.data.length){
            this.scramble();
            this.startRedraw();
            return;
        }
        window.setTimeout(this.processPixels, 0);
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
        else{
            return new PixelQuickSorter(this.swapPixels, this.redraw, this.onPixelsSorted);
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
        const tempPixel = this.pixels[ogIndex];
        this.pixels[ogIndex] = this.pixels[destIndex];
        this.pixels[destIndex] = tempPixel; 

        this.drawBuffer.enqueue({ogIndex, destIndex});
    }

    swapPixelData = (swapObj) => {

        let ogIndex = swapObj.ogIndex;
        let destIndex = swapObj.destIndex;

        ogIndex     = ogIndex * 4;
        destIndex   = destIndex * 4;

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
        requestAnimationFrame(this.readFromBuffer);

        if(this.drawBuffer.getSize() > 0){

            const limit = Math.min(this.drawBuffer.getSize(), this.swapsPerFrameMax); 

            for(let i = 0; i < limit; i ++){
                const swapObj = this.drawBuffer.dequeue();
                this.swapPixelData(swapObj);
            }
            
        }
    }


    redraw = () => {
        requestAnimationFrame(this.redraw);
        this.ctx.putImageData(this.imageData, 0, 0);
    }

}

export default PixelSortCanvasDrawer;

