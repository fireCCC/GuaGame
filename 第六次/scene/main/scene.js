var Scene = function (game) {
    var s = {
        game: game,
    }
    //初始化
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0

    //全局变量
    blocks = loadLevel(game, 1)

    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })

    s.draw = function () {
        //draw背景
        game.context.fillStyle = "#357"
        game.context.fillRect(0, 0, 400, 300)
        //draw
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        game.context.fillText('分数' + score, 10, 290)
    }
    s.update = function () {
        if (window.paused) {
            return
        }
        ball.move()
        //判断游戏结束
        if (ball.y > paddle.y) {
            var end = SceneEnd.new(game)
            game.replaceScene(end)
            return
        }
        //判断 paddle 和 ball 相撞
        if (paddle.collide(ball)) {

            ball.rebound()
        }
        //判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                //更新分数
                score += 100
                ball.rebound()

            }
        }
    }

    var enableDrag = false
    game.canvas.addEventListener('mousedown', function (event) {
        //log(event)
        var x = event.offsetX
        var y = event.offsetY
        if (ball.hasPoint(x, y)) {
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function (event) {
        //log(event)
        var x = event.offsetX
        var y = event.offsetY
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function (event) {
        //log(event)
        var x = event.offsetX
        var y = event.offsetY
        enableDrag = false
    })
    return s
}