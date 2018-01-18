var GuaGame = function(fps, images, runCallback) {
    //runCallback回调函数
    //images 是一个对象，里面是图片的引用名字和路径
    //程序在图片载入后运行
    var g = {
        actions: {},
        keydowns: {},
        images: {},
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
    var loads = []
    //预先载入所有图片
    var names = Object.keys(images)

    for(var i = 0; i < names.length; i++) {
        let name = names[i]
        log(name)
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            g.images[name] = img
            //所有图片成功载入之后
            loads.push(1)
         
            if(loads.length == names.length) {
                
                g.run()
            }
        }
    }
    g.imageByName = function(name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img
        }
        return image
    }
    g.run = function() {
        runCallback(g)
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    return g
}

