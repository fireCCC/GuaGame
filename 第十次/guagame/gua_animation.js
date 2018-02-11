class GuaAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            idle: [],
            run: [],
        }
        for(var i = 1; i < 5; i++) {
            var name = 'idle' + i
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for(var i = 1; i < 12; i++) {
            var name = 'run' + i
            var t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3

        this.flipX = false
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        this.frameCount--
        if(this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        if(this.flipX) {
            context.save()

            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)

            context.drawImage(this.texture, this.x, this.y)
            context.restore()
        }else {
            context.drawImage(this.texture, this.x, this.y)            
        }
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        var animationNames = {
            down: 'run',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
        // if(keyStatus == 'down') {
        //     this.changeAnimation('run')
        // }else if(keyStatus == 'up') {
        //     this.changeAnimation('idle')
        // }
        
    }
    changeAnimation(name) {
        this.animationName = name
    }
}