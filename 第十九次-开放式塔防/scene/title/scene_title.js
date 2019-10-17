class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        //
        this.setup()
    }
    setup() {
        //bg
        var bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)
        //gun ui
        var gun = GuaImage.new(this.game, 'gun')
        gun.x = 500
        gun.y = 300
        this.gun = gun
        this.addElement(gun)    
        //
        this.setupInputs()
    }
    debug() {
    }
    update() {
        super.update()
    }
    
    setupInputs() {
        let self = this
        //mouse inputs
        let startDrag = false
        this.game.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY
            if (status === 'down') {
                let clickTheFrame = self.gun.pointInFrame(x, y)
                if (clickTheFrame) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                }
            } else if (status === 'move') {
                self.tower.x = x
                self.tower.y = y
            } else {
                startDrag = false
                self.removeElement(self.tower)
            }
            log('mouse event', event, status)
        })
        //keyboard inputs
        var b = this.mario
        let playerSpeed = 5
    }
}
