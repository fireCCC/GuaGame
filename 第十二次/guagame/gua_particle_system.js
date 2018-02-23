class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.duration = 50
        this.x = 150
        this.y = 100
        this.numberOfParticles = 100
        this.particles = []
    }
    update() {
        this.duration--
        
        if(this.particles.length < this.numberOfParticles) {
            
            var p = GuaParticle.new(this.game)
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        for (var p of this.particles) {
            p.update()
        }

        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if(this.duration < 0) {
            return 
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
    
}