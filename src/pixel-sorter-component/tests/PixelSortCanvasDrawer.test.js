import Pixel from '../PixelSortCanvasDrawer.js'
import PixelSortCanvasDrawer from '../PixelSortCanvasDrawer.js';

test('Process Pixels', () => {
    const pixelSortCanvasDrawer = new PixelSortCanvasDrawer();

    pixelSortCanvasDrawer.pixelWidth = 10;
    pixelSortCanvasDrawer.imageData.width = 100;
    pixelSortCanvasDrawer.imageData.height = 100;

    pixelSortCanvasDrawer.scramble = () => {}
    pixelSortCanvasDrawer.startRedraw = () => {}
    pixelSortCanvasDrawer.processPixels();
    
    expect(pixelSortCanvasDrawer.pixels.length).toBe(100);

    pixelSortCanvasDrawer.pixels.forEach(((pixel, index) => {
        expect(pixel.truePosition).toBe(index);
    }));

});