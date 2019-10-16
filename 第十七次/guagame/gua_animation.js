class GuaAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            idle: [],
            run: [],
        }
        for(var i = 1; i < 5; i++) {
            var name = 'b' + i
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for(var i = 1; i < 12; i++) {
            var name = 'run' + i
            var t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        this.animationName = 'b'
        this.texture = this.animations['idle'][0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3

        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        //重力和加速度
        this.gy = 10
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -8
        this.rotation = -5
    }
    update() {
        //更新alpha
        if(this.alpha > 0) {
            this.alpha -= 0.05
        }
        //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.1
        var h = 380
        if(this.y > h){
            this.y = h
        }
        //更新角度
        if(this.rotation < 10) {
            this.rotation += 3
        }
        // this.frameCount--
        // if(this.frameCount == 0) {
        //     this.frameCount = 3
        //     this.frameIndex = (this.frameIndex + 1) % this.frames().length
        //     this.texture = this.frames()[this.frameIndex]
        // }
    }
    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if(this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 100)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // var animationNames = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
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