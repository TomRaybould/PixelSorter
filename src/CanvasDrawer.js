
import Pixel from './Pixel'
import Scrambler from './Scrambler'
import PixelQuickSort from './PixelQuickSort'

class CanvasDrawer {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.imageData = [];
        this.pixels = [];
    }

    drawImage = (onImageLoaded) => {
        this.onImageLoaded = onImageLoaded;
        const url = 'color_bars.png'
        
        var loadImage = function (url, onImageLoaded) {
            var img = new Image();
            img.src = url
            img.onload = function () { 
                onImageLoaded(img);
            }
        }
        loadImage(url, this.processImageIntoPixelArray);
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
            this.onImageLoaded();
            return;
        }
        
        window.setTimeout(this.processPixels, 0);

    }

    resizeCanvas = (width, height) => {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    scramble = () => {
        const scrambler = new Scrambler(this.pixels, this.swapPixels, this.redraw, this.onScrambleFinished);
        scrambler.scramble();
    }

    onScrambleFinished = () => {
        const sort = () =>{        
            const pixelQuickSort = new PixelQuickSort(this.swapPixels, this.redraw);
            pixelQuickSort.quickSort(this.pixels, 0, this.pixels.length - 1, 1, this.pixels.length - 1);
            setInterval(this.redraw, 10);
        }
        setTimeout(sort, 2000);
    } 

    swapPixels = (ogIndex, destIndex) => {
        const tempPixel = this.pixels[ogIndex];
        this.pixels[ogIndex] = this.pixels[destIndex];
        this.pixels[destIndex] = tempPixel; 

        ogIndex = ogIndex * 4;
        destIndex = destIndex * 4;

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

    redraw = () => {
        this.ctx.putImageData(this.imageData, 0, 0);
    }

}

export default CanvasDrawer;

