const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
canvas2.width = window.innerWidth - 100;
canvas2.height = window.innerHeight - 100;

function drawBg(){
    var background = new Image();
    background.src = 'bg.png';
    
    background.addEventListener('load', function(){
        ctx2.drawImage(background, 0, 0);
    }, false)
}

var dinoImg = new Image();
dinoImg.src = 'mario.png';

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw(){
        ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
    }
}

class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'coral';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

window.onload = function(){
    drawBg();
    gameState.startGame();
}

var animation;
var gameState = {
    timer: 0,
    cactusArray: [],
    jumping: false,
    jumpTimer: 0,
    isEnd: false,
    startGame: function game(){
        this.timer++;
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        if (this.timer % 180 === 0) {
            var cactus = new Cactus();
            this.cactusArray.push(cactus);
        }
        this.cactusArray.forEach((cactus, index, obj) => {
            if (cactus.x < 0) {
                obj.splice(index, 1);
            }
    
            this.isCrashed(dino, cactus);
    
            cactus.x-=2;
            cactus.draw();
        })
    
        if (this.jumping) {
            dino.y--;
            this.jumpTimer++;
        } else {
            if(dino.y < 200) {
                dino.y++;
                this.jumpTimer = 0;
            }
        }
        if(this.jumpTimer > 100) {
            this.jumping = false;
        }
        
        dino.draw();
        setTimeout(() => {
            
            this.endGame();
        }, 2000);
        
        return animation = requestAnimationFrame(game);
    },
    isCrashed(dino, cactus){
        var xNum = cactus.x - (dino.x + dino.width);
        var yNum = cactus.y - (dino.y + dino.height);
        if (xNum < 0 && yNum < 0) {
            this.endGame();
        }
    },
    endGame(){
        console.log(animation);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(this.animation);
        this.isEnd = true;
    }
}


document.addEventListener('keydown', function(e){
    if (e.code === 'Space') {
        gameState.jumping = true;
    }
})