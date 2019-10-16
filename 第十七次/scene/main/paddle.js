var Paddle = function(game) {
    var o = game.imageByName('paddle')
    
    o.x = 100
    o.y = 250
    o.speed = 15
    o.move = function(x) {
        if(x < 0) {
            x = 0
        }
        if(x > (400 - o.w)) {
            x = 400 - o.w
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    var aInb = function(x, x1, x2) {
        return x1 <= x && x <= x2 
    }
    o.collide = function(ball) {
        // if(ball.y + ball.h > o.y) {
        //     if(ball.x > o.x && ball.x < o.x + o.w) {
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        if((aInb(a.x, b.x, b.x + b.w)) || (aInb(b.x, a.x, a.x + a.w)) ) {
            if((aInb(a.y, b.y, b.y + b.h)) || (aInb(b.y, a.y, a.y + a.h))) {
                return true
            }
        }
        return false
    }
    return o
}
