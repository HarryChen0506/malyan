# Coordinate system

### Pixel Coordinate System

The Pixel Coordinate System is used when referring to individual pixels in the shape and supports sub-pixel precision.  

The origin of the coordinate system is such that 0.0,0.0 is the top left corner of the top left pixel in the image and columns, rows would be the bottom right corner of the bottom right pixel in the image.   

A coordinate of .5,.5 is therefore the center of the top left pixel.

1. The function calcCanvasToPixelCoordinatePoint() can be used to convert canvas coordinates obtained from browser events to coordinates in the pixel coordinate system.

2. The function calcPixelToCanvasCoordinatePoint() can be used to convert pixel coordinates obtained from browser events to coordinates in the canvas coordinate system..