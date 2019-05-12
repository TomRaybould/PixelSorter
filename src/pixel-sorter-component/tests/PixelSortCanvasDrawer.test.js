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

test('convertPixelBlockPosToArrIndex', () => {
    const pixelSortCanvasDrawer = new PixelSortCanvasDrawer();

    pixelSortCanvasDrawer.pixelWidth = 10;
    pixelSortCanvasDrawer.imageData.width = 100;
    pixelSortCanvasDrawer.imageData.height = 100;
    
    let pixelBlockPos = 12;
    let expectedArrPos = 1020 * 4;

    let actualArrPos = pixelSortCanvasDrawer.convertPixelBlockPosToArrIndex(pixelBlockPos);
    
    expect(actualArrPos).toBe(expectedArrPos);

    pixelSortCanvasDrawer.pixelWidth = 1
    pixelSortCanvasDrawer.imageData.width = 10;
    pixelBlockPos = 1;
    expectedArrPos = 4;

    actualArrPos = pixelSortCanvasDrawer.convertPixelBlockPosToArrIndex(pixelBlockPos);
    
    expect(actualArrPos).toBe(expectedArrPos);

});


test('Swap Pixel Data', () => {
    const pixelSortCanvasDrawer = new PixelSortCanvasDrawer();

    pixelSortCanvasDrawer.pixelWidth = 1;
    pixelSortCanvasDrawer.imageData.width = 10;

    const pixelArr = [];
    pixelArr[0] = 255;
    pixelArr[1] = 255;
    pixelArr[2] = 255;
    pixelArr[3] = 255;
    pixelArr[4] = 0;
    pixelArr[5] = 0;
    pixelArr[6] = 0;
    pixelArr[7] = 0;
    
    pixelSortCanvasDrawer.imageData.data = pixelArr;
    expect(pixelSortCanvasDrawer.imageData.data[0]).toBe(255);
    expect(pixelSortCanvasDrawer.imageData.data[4]).toBe(0);

    pixelSortCanvasDrawer.swapPixelData({ogIndex : 0, destIndex : 1});

    expect(pixelSortCanvasDrawer.imageData.data).toEqual([0, 0, 0, 0, 255, 255, 255, 255]);

});


test('Indexes In section', () => {
    
    const pixelSortCanvasDrawer = new PixelSortCanvasDrawer();

    pixelSortCanvasDrawer.imageData.width = 100;
    pixelSortCanvasDrawer.pixelWidth = 5;

    let actualResults = pixelSortCanvasDrawer.getPixelSectionIndexes(40);

    let expectedResults = 
    [   40,     44,     48,     52,     56,
        440,    444,    448,    452,    456,
        840,    844,    848,    852,    856,
        1240,   1244,   1248,   1252,   1256,
        1640,   1644,   1648,   1652,   1656
    ]

    expect(actualResults).toEqual(expectedResults);
    
    pixelSortCanvasDrawer.pixelWidth = 1;

    actualResults = pixelSortCanvasDrawer.getPixelSectionIndexes(40);
    
    expectedResults = [40]

    expect(actualResults).toEqual(expectedResults);

});
