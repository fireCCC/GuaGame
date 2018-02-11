var Block = function(game, position) {
    var p = position
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        alive: true,
        lifes: p[2] || 1,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.kill = function() {
        o.lifes--
        if(o.lifes < 1) {
            o.alive = false
        }
       
    }
    o.collide = function(b) {
        return o.alive && (rectIntersects(b, o) || rectIntersects(o, b))
    }
    
    return o
}