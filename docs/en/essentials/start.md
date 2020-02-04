# start

### Example
Here is a HTML boilerplate for rendering a rectangle in malyan:

``` html
<!DOCTYPE html>
<html>

<body>
    <canvas id="canvas"></canvas>
    <script src="https://unpkg.com/malyan"></script>
    <script>
        var canvas = new Malyan({
            id: 'canvas',
            width: 500,
            height: 500,
        })

        var rect = new Malyan.Rect({
            name: 'rect',
            x: 0,
            y: 0,
            width: 60,
            height: 80,
            fillStyle: 'rgba(64, 196, 255, 0.2)',
            strokeStyle: '#40c4ff',
            lineWidth: 2,
        })
        rect.translation = {
            x: 100,
            y: 100
        }
        rect.on('mousedrag', function(e) {
            rect.translation = {
                x: rect.translation.x + e.detail.deltaPoint.canvas.x,
                y: rect.translation.y + e.detail.deltaPoint.canvas.y
            }
        })
        canvas.add(rect)

        function animateLoop() {
            canvas.render()
            requestAnimationFrame(animateLoop)
        }
        animateLoop()
    </script>
</body>

</html>
```

### Complex Examples ###

[more examples](https://malyanjs.github.io/examples/)