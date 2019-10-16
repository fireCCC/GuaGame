var Ball = function(game) {
    var o = game.imageByName('ball')
    o.x = 100
    o.y = 200
    o.speedX = 5
    o.speedY = 5
    o.fired = false
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
    o.hasPoint = function(x, y) {
        var xIn = (o.x <= x && x <= o.x + o.w)
        var yIn = (o.y <= y && y <= o.y + o.h)
        return xIn && yIn
    }
    return o
}
