class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}

        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })

        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false
        })
        this.init()
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(guaImage) {
        this.context.drawImage(guaImage.texture, guaImage.x, guaImage.y)
    }
    //update
    update() {
        this.scene.update()
    }
    //draw
    draw() {
        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

        g.update && g.update()
        g.draw()
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }

    textureByName(name) {
        var g = this
        var img = g.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img
        // }
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start() {
        this.runCallback(this)
    }
    init() {
        var g = this
        var loads = []

        //预先载入所有图片
        var names = Object.keys(g.images)
        log(names)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            log(name)
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                g.images[name] = img
                //所有图片成功载入之后
                loads.push(1)

                if (loads.length == names.length) {

                    g.__start()
                }
            }
        }
    }
}
// var GuaGame = function(fps, images, runCallback) {
//     //runCallback回调函数
//     //images 是一个对象，里面是图片的引用名字和路径
//     //程序在图片载入后运行
//     var g = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         images: {},
//     }
//     var canvas = document.querySelector('#id-canvas')
//     var context = canvas.getContext('2d')
//     g.canvas = canvas
//     g.context = context
//     g.drawImage = function(guaImage) {
//         g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
//     }


//     //update
//     g.update = function() {
//         g.scene.update()
//     }
//     //draw
//     g.draw = function() {
//         g.scene.draw()
//     }

//     g.registerAction = function(key, callback) {
//         g.actions[key] = callback
//     }
//     window.fps = 30

//     var runloop = function() {
//         var actions = Object.keys(g.actions)
//         for(var i = 0; i < actions.length; i++)
//         {
//             var key = actions[i]
//             if(g.keydowns[key]) {
//                 g.actions[key]()
//             }
//         }
//         g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

//         g.update && g.update()
//         g.draw()
//         setTimeout(function(){
//             runloop()
//         }, 1000/window.fps)
//     }
//     var loads = []
//     //预先载入所有图片
//     var names = Object.keys(images)

//     for(var i = 0; i < names.length; i++) {
//         let name = names[i]
//         log(name)
//         var path = images[name]
//         let img = new Image()
//         img.src = path
//         img.onload = function() {
//             g.images[name] = img
//             //所有图片成功载入之后
//             loads.push(1)

//             if(loads.length == names.length) {

//                 g.__start()
//             }
//         }
//     }
//     g.imageByName = function(name) {
//         var img = g.images[name]
//         var image = {
//             w: img.width,
//             h: img.height,
//             image: img
//         }
//         return image
//     }
//     g.runWithScene = function(scene) {
//         g.scene = scene
//         setTimeout(function(){
//             runloop()
//         }, 1000/window.fps)
//     }
//     g.replaceScene = function(scene) {
//         g.scene = scene
//     }


//     g.__start = function() {
//         runCallback(g)
//     }

//     return g