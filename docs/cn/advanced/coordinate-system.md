# 坐标系

### 像素坐标系

像素坐标系被用来引用图形中的像素点，并支持亚像素精度。  

图像坐标系的单位是mm，属于物理单位，而像素坐标系的单位是pixel，我们平常描述一个像素点都是几行几列。  

像素坐标系的原点（0，0 ）位于图片的左上角，横坐标与纵坐标分别是在其图像数组中所在的列数与所在行数。

1. calcCanvasToPixelCoordinatePoint()方法可以将canvas坐标系(从浏览器事件获取)转化为像素坐标系。

2. calcPixelToCanvasCoordinatePoint()方法可以将像素坐标系转换成canvas坐标系。