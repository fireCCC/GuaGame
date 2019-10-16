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
            this.keydowns[event.key] = 'down'
        })

        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = 'up'
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
            var status = g.keydowns[key]
            if (status == 'down') {
                g.actions[key]('down')
            }else if(status == 'up') {
                g.actions[key]('up')
                g.keydowns[key] = null
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
