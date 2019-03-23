
import Pixel from './Pixel'

class CanvasDrawer {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.imageData = [];
        this.pixels = [];
    }

    drawImage = (canvas) => {

        if(this.pixels.length === 0){
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

    }

    processImageIntoPixelArray = (image) => {
        this.resizeCanvas(image.width, image.height);
        this.ctx.drawImage(image, 0, 0);
        
        const imageData = this.ctx.getImageData(0, 0, image.width, image.height);

        this.imageData = imageData;
        
        this.processPixels();
    }

    processPixels = () => {
        
        let curr = this.pixels.length ? this.pixels.length : 0;
        
        const sectionLength = curr + (20000 * 4);

        for(let i = curr; i < sectionLength; i += 4){
            curr = i;
            const pixelPosition = i / 4;
            const pixel = new Pixel();
            
            pixel.truePosition      = pixelPosition;
            pixel.currentPosition   = pixelPosition;
            
            this.pixels.push(pixel);
        }

        if(curr + 3 >= this.imageData.data.length){
            console.log('Done loading pixels');
            return;
        }
        window.setTimeout(this.processPixels, 0);

    }

    resizeCanvas = (width, height) => {
        this.canvas.width = width;
        this.canvas.height = height;
    }

}

export default CanvasDrawer;

