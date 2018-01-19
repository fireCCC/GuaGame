var loadLevel = function (game, n) {
    n -= 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)

    }
    return blocks
}
//全局变量
var blocks = []

var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !(window.paused)
        } else if ('1234567'.includes(k)) {
            //全局变量
            blocks = loadLevel(game, Number(k))
        }

    })
    //控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}
var __main = function () {


    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    //g为形参，等于game
    var game = GuaGame(30, images, function(g){
        var s = Scene(g)
        g.runWithScene(s)
    })
    
    enableDebugMode(game, true)



}
__main()