class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        //初始化
        game.registerAction('k', function () {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    draw() {
        this.game.context.fillText('按 K 开始游戏', 100, 100)
    }
    update() {

    }
}
