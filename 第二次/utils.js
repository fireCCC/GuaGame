var log = console.log.bind(console) 

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}


var rectIntersects = function(a, b) {
    if(b.y > a.y && b.y < a.y + a.image.height) {
        if(b.x > a.x && b.x < a.x + a.image.width) {
            return true
        }
    }
    return false
}