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
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy0.png',
        enemy2: 'img/enemy0.png',
        enemy3: 'img/enemy0.png',
        enemy4: 'img/enemy0.png',
        fire: 'img/fire.png',
        //跑动动画
        run1: 'img/walking/running-1.png',
        run2: 'img/walking/running-2.png',
        run3: 'img/walking/running-3.png',
        run4: 'img/walking/running-4.png',
        run5: 'img/walking/running-5.png',
        run6: 'img/walking/running-6.png',     
        run7: 'img/walking/running-7.png',        
        run8: 'img/walking/running-8.png',        
        run9: 'img/walking/running-9.png',        
        run10: 'img/walking/running-10.png',        
        run11: 'img/walking/running-11.png',   
        //原地动画    
        idle1: 'img/standing/playing-1.png',
        idle2: 'img/standing/playing-2.png',
        idle3: 'img/standing/playing-3.png',
        idle4: 'img/standing/playing-4.png',
        
        cave: 'img/sky.png',
        //flappy bird
        bg: 'img/bird/bg.png',
        ground: 'img/bird/ground.png',
        b1: 'img/bird/b1.png',
        b2: 'img/bird/b2.png',
        b3: 'img/bird/b3.png',
        b4: 'img/bird/b4.png',
        

    }
    //g为形参，等于game
    var game = GuaGame.instance(30, images, function (g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)



}
__main()
