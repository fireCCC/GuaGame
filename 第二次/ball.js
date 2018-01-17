var Ball = function() {
    var image = imageFromPath('ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.move = function() {
        if(o.fired) {
            if(o.x < 0 || 400 < o.x) {
                o.speedX *= -1
            }
            if(o.y < 0 || 400 < o.y) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function() {
        o.fired = true
    }
    o.rebound = function() {
        o.speedY *= -1
    }
    return o
}
