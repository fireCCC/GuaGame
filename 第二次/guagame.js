var GuaGame = function(fps) {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
    })

    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })

    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    window.fps = 30

    var runloop = function() {
        var actions = Object.keys(g.actions)
        for(var i = 0; i < actions.length; i++)
        {
            var key = actions[i]
            if(g.keydowns[key]) {
                g.actions[key]()
            }
        }
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        g.update()
        g.draw()
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }
    setTimeout(function(){
        runloop()
    }, 1000/window.fps)
    return g
}

