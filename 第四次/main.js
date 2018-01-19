var loadLevel = function(game, n) {
    n -= 1
    var level = levels[n]
    var blocks = []
    for(var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)

    }
    return blocks
}
//全局变量
var blocks = []

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return 
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if(k == 'p') {
            window.paused = !(window.paused)
        }else if ('1234567'.includes(k)) {
            //全局变量
            blocks = loadLevel(game, Number(k))
        }

    })
    //控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event){
        var input = event.target
        window.fps = Number(input.value)
    })
}
var __main = function() {
   

    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
        

    var game = GuaGame(30, images, function(g){

        var paddle = Paddle(game)
    
        var ball = Ball(game)
        
        var score = 0
   
        //全局变量
        blocks = loadLevel(game, 1)
   
   
        game.registerAction('a', function(){
           paddle.moveLeft()
        })
        game.registerAction('d', function(){
           paddle.moveRight()
        })
        game.registerAction('f', function(){
           ball.fire()
        })
       
        game.update = function() {
           if(window.paused){
               return 
           }
           ball.move()
           //判断 paddle 和 ball 相撞
           if (paddle.collide(ball)) {
              
               ball.rebound()
           }
           //判断 ball 和 blocks 相撞
           for(var i = 0; i < blocks.length; i++) {
               var block = blocks[i]
               if(block.collide(ball)) {
                   block.kill()
                   //更新分数
                   score += 100
                   ball.rebound()
                   
               }
           }
          
        }
        game.draw = function() {

            //draw背景
            game.context.fillStyle = "#357"
            game.context.fillRect(0, 0, 400, 300)
            //draw
            game.drawImage(paddle)
            game.drawImage(ball)
            for(var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    game.drawImage(block)        
                }
            }
            game.context.fillText('分数' + score, 10, 290)
        }
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function(event) {
            //log(event)
            var x = event.offsetX
            var y = event.offsetY 
            if(ball.hasPoint(x, y)) {
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            //log(event)
            var x = event.offsetX
            var y = event.offsetY 
            if(enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            //log(event)
            var x = event.offsetX
            var y = event.offsetY 
            enableDrag = false
        })
    })

    enableDebugMode(game, true)

    
    
}
__main()