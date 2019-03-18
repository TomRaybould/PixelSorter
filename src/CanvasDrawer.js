

class CanvasDrawer {
    constructor(canvas){
    
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.color = false;
    }

    doWork = (canvas) => {

        const imageData = this.ctx.getImageData(0,0,this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (var i = 0; i < data.length; i += 4) {
            var val = this.color ? 255 : 0;
            data[i] = val; 
            data[i+1] = val; 
            data[i+2] = val; 
            data[i+3] = 255; 
        }

        this.color = !this.color;
        this.showPixels(this.ctx, imageData);
        //pixel += 4;
    
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

