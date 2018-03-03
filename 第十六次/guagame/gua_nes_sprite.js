class GuaNesSprite {
    constructor(game) {
        this.game = game
        this.tileOffset = -8064
        this.data = window.bytes.slice(this.tileOffset)
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
        this.pixelWidth = 5
        this.rowsOfSprite = 4
        this.columnsOfSprite = 2
        this.w = this.pixelWidth * this.columnsOfSprite * 8
        this.h = this.pixelWidth * this.rowsOfSprite * 8
        this.frameIndex = 0
        this.frameCount = 3

        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        //重力和加速度
        this.gy = 10
        this.vy = 0
        //加速和摩擦
        this.vx = 0
        this.mx = 0
    }
    static new(game) {
        return new this(game)
    }
    drawBlock(context, data, x, y, pixelWidth) {
        const colors = [
            'white',
            '#FE1000',
            '#FFB010',
            '#AA3030',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for(let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for(let j = 0; j < 8; j++) {
               //8 bits per line
               //78 69 0100 1110 0100 0101
               //在 J循环中，每次画一个像素点
               let c1 = (p1 >> (7 - j)) & 0b00000001
               let c2 = (p2 >> (7 - j)) & 0b00000001
               let pixel = (c2 << 1) + c1
               if(pixel == 0) continue
               let color = colors[pixel]
               context.fillStyle = color
               let px = x + j * w
               let py = y + i * h
               context.fillRect(px, py, w, h)
            }
        }
    }

    drawSprite() {
        let bytesPerBlock = 16
        let dataOffset = this.frameIndex * bytesPerBlock * 8
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 6
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock * pixelWidth
        let offset = 0
        for(var i = 0; i < this.rowsOfSprite; i++) {
            for(var j = 0; j < this.columnsOfSprite; j++) {
                let x = j * blockSize
                let y = i * blockSize
                let pixels = data.slice(offset)
                this.drawBlock(context, pixels, x, y, pixelWidth)
                offset += 16
            }
        }
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -8
    }
    update() {
        //更新 x 加速和摩擦
        this.vx += this.mx
        //说明摩擦力已经把速度降到 0 停止摩擦
        if(this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        }else {
            this.x += this.vx
        }
        //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.1
        var h = 100
        if(this.y > h){
            this.y = h
        }
        this.frameCount--
        if(this.frameCount == 0) {
            this.frameCount = 6
            this.frameIndex++
            this.frameIndex %= 4
            // this.frameIndex = (this.frameIndex + 1) % this.frames().length
            // this.texture = this.frames()[this.frameIndex]
        }
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

        // draw mario
        this.drawSprite()

        context.restore()
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        // this.x += x
        let s = 0.5 * x
        if(keyStatus == 'down') {
            this.vx += s
            this.mx = -s / 3
        }else {

        }
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
