class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        //初始化
        // var label = GuaLabel.new(game, 'hello from gua')
        // this.addElement(label)

        //bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        //循环移动的地面
        this.grounds = []
        for(var i = 0; i < 30; i++){
            var g = GuaImage.new(game, 'ground')
            g.x = i * 23
            g.y = 400
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        //bird
        var b = GuaAnimation.new(game)
        b.x = 100
        b.y = 100
        this.bird = b
        this.addElement(this.bird)

        this.setupInputs()
    }
    update() {
        super.update()
        this.skipCount--
        var offset = -5
        if(this.skipCount == 0){
            this.skipCount = 4
            offset = 15
        }
        for(var i = 0; i < 30; i++){
            var g = this.grounds[i]
            g.x += offset
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        this.game.registerAction('a', function(keyStatus){
            b.move(-10, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus){
            b.move(10, keyStatus)
        })
        this.game.registerAction('j', function(keyStatus){
            b.jump()
        })
    }
}
