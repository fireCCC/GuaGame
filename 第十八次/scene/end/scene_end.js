class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        //初始化
        game.registerAction('r', function () {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('游戏结束,按 r 返回标题界面', 100, 200)
    }
    update() {

    }
}
// var SceneEnd = function (game) {
//     var s = {
//         game: game,
//     }
//     //初始化
//     game.registerAction('r', function () {
//         var s = SceneTitle.new(game)
//         game.replaceScene(s)
//     })
//     s.draw = function () {

//         game.context.fillText('游戏结束,按 r 返回标题界面', 100, 200)
//     }
//     s.update = function () {

//     }
//     return s
// }