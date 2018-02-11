class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        //初始化
        var label = GuaLabel.new(game, 'hello from gua')
        this.addElement(label)

        var cave = GuaImage.new(game, 'cave')
        this.addElement(cave)

        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 180
        this.w = w
        this.addElement(w)

        this.setupInputs()
    }
    setupInputs() {
        var self = this
        this.game.registerAction('a', function(keyStatus){
            self.w.move(-18, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus){
            self.w.move(18, keyStatus)
        })
    }
}
