class Bullet extends GuaImage {
    constructor(game) {
      super(game, 'bullet')
      this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
        // this.speed = 2
    }
    update() {

        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if(this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if(this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }

    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()

    }
    setup() {
      this.speed = randomBetween(2, 5)
      this.x = randomBetween(0, 350)
      this.y = -randomBetween(0, 200)


    }
    update() {
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
        }
    }

}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()

    }
    setup() {
      this.speed = 1
      this.x = randomBetween(0, 350)
      this.y = -randomBetween(0, 200)


    }
    update() {
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }

}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        //初始化
        this.setup()
        this.setupInputs()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        var game = this.game
        this.numberofEnemies = 10
        this.bg = GuaImage.new(this.game, 'sky')

        this.cloud = Cloud.new(this.game, 'cloud')

        this.player = Player.new(this.game)
        this.player.x = 100
        this.player.y = 150
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)

        this.addEnemies()
        
        var ps = GuaParticleSystem.new(this.game)

        this.addElement(ps)

    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberofEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('s', function () {
            s.player.moveDown()
        })
        g.registerAction('j', function () {
            s.player.fire()
        })
    }
    update() {
        super.update()
        this.cloud.y += 1
    }
}
