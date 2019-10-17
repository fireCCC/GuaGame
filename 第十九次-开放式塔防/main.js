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
            //blocks = loadLevel(game, Number(k))
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
        //flappy bird
        bg: 'img/bird/bg.jpg',
        pipe: 'img/bird/PipeUp.png',
        ground: 'img/bird/ground.png',
        b1: 'img/bird/b1.png',
        b2: 'img/bird/b2.png',
        b3: 'img/bird/b3.png',
        b4: 'img/bird/b4.png',

        t1: 'tiles/t1.png',
        t2: 'tiles/t2.png',
        t3: 'tiles/t3.png',
        t4: 'tiles/t4.png',
        //
        gun: 'img/gun.png'
    }

    var game = GuaGame.instance(30, images, function (g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        // var s = SceneEditor.new(g)

        g.runWithScene(s)
    })
    // let request = {
    //     url: 'mario.nes',
    //     callback(r) {
    //         window.bytes = new Uint8Array(r)
    //         log(window.bytes.length)
    //          //g为形参，等于game
    //         enableDebugMode(game, true)
    //     },
    // }
    // ajax(request)
}
__main()
