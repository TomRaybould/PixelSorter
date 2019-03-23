

class CanvasDrawer {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    drawImage = (canvas) => {
        
        const url = 'color_bars.png'

        var loadImage = function (url, ctx, resize) {
            var img = new Image();
            img.src = url
            img.onload = function () { 
                resize(this.width, this.height);
                ctx.drawImage(img, 0, 0);
            }
        }
        loadImage(url, this.ctx, this.resizeCanvas);
    }

    resizeCanvas = (width, height) => {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    

    /*
    manipulateImageData = (ctx, currentPixel) => {    
        const imageData = ctx.getImageData(0,0,300,300);
        const data = imageData.data;
        
        for (var i = 0; i < data.length; i += 4) {
            var val = 0;
            data[i] = val; 
            data[i+1] = val; 
            data[i+2] = val; 
            data[i+3] = val; 
        }
    
        showPixels(ctx, imageData);
        pixel += 4;
    }
    */
    
    showPixels = (ctx, imageData) => {
        ctx.putImageData(imageData, 0, 0);
    }
    
    sleep(millis)
    {
        var date = new Date();
        var curDate = null;
        do { curDate = new Date(); }
        while(curDate-date < millis);
    }

}

export default CanvasDrawer;

