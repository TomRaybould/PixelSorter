import Pixel from '../Pixel.js'


test('pixel comparedTo method', () => {
    const pixel1 = new Pixel();
    pixel1.truePosition = 0;
    const pixel2 = new Pixel();
    pixel2.truePosition = 0;

    expect(pixel1.comparedTo(pixel2)).toBe(0);
    
    pixel1.truePosition = 1;
    
    expect(pixel1.comparedTo(pixel2)).toBe(1);

    pixel1.truePosition = -1;

    expect(pixel1.comparedTo(pixel2)).toBe(-1);

});