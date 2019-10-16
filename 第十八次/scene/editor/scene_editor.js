
class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        // //bg
        // var bg = GuaImage.new(game, 'bg')
        // this.addElement(bg)
        //tile map
        let map = GuaTileMap.new(game)
        this.addElement(map)
        // mario
        let mario = GuaNesSprite.new(game, map)
        this.addElement(mario)
        mario.x = 100
        mario.y = 100
        this.mario = mario


        this.setupInputs()
    }
    debug() {
        this.birdspeed = config.bird_speed.value
    }
    update() {
        super.update()
        //地面移动
        // this.skipCount--
        // var offset = -5
        // if (this.skipCount == 0) {
        //     this.skipCount = 4
        //     offset = 15
        // }
        // for (var i = 0; i < 30; i++) {
        //     var g = this.grounds[i]
        //     g.x += offset
        // }
    }
    setupInputs() {
        var self = this
        var b = this.mario
        let playerSpeed = 2
        this.game.registerAction('a', function (keyStatus) {
            b.move(-playerSpeed, keyStatus)
        })
        this.game.registerAction('d', function (keyStatus) {
            b.move(playerSpeed, keyStatus)
        })
        this.game.registerAction('j', function (keyStatus) {
            b.jump()
        })
    }
}
