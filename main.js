const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var dinoImg = new Image();
dinoImg.src = 'mario.png';

var dino = {
    x: 10,
    y: 400,
    width: 50,
    height: 50,
    draw(){
        ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
    }
}

var cactusImg = new Image();
cactusImg.src = 'item.jpg';

class Cactus{
    constructor(){
        this.x = canvas.width;
        this.y = 400;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'coral';
        ctx.drawImage(cactusImg, this.x, this.y, this.width, this.height);
    }
}


var dinoPosition;
var cactusPosition;
var diffPosition;
var animation,
    dieAnimation,
    timer = 0,
    cactusArray = [],
    jumping = false,
    jumpTimer = 0,
    dying = false,
    dieTimer = 0,
    isEnd = false,
    speed = 5;
    random = 0;

var gameState = function(){
    function startGame(){
        scorePosition = `내 점수 : ${timer}`
        document.getElementById('score').innerHTML = scorePosition;

        dinoPosition = `나의 위치 x : ${dino.x + dino.width}, y : ${dino.y + dino.height}`
        document.getElementById('tit2').innerHTML = dinoPosition;

        timer += speed;
        random = (Math.floor(Math.random() * 10) + 5) * 60;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animation = requestAnimationFrame(startGame);
    
        if (timer % random === 0) {
            var cactus = new Cactus();
            cactusArray.push(cactus);
        }
        cactusArray.forEach((cactus, index, obj) => {
            if (cactus.x < - cactus.width) {
                obj.splice(index, 1);
            }
    
            isCrashed(dino, cactus);
    
            cactus.x -= speed * 2;
            cactus.draw();
            
            if (index === 0) {
                cactusPosition = `장애물의 위치 x : ${cactus.x + cactus.width}, y : ${cactus.y + cactus.height}`
                document.getElementById('tit').innerHTML = cactusPosition;
            }
        });
    
        if (jumping) {
            dino.y -= speed * 2;
            jumpTimer += speed;
        } else {
            if(dino.y < 400) {
                dino.y += speed * 2;
                jumpTimer = 0;
            }
        }
        if(jumpTimer > 100) {
            jumping = false;
        }
        
        dino.draw();
    };
    function isCrashed(dino, cactus){
        var xNum = (cactus.x + cactus.width) - (dino.x + dino.width);
        var yNum = (cactus.y + cactus.height) - (dino.y + dino.height);
        diffPosition = `장애물 - 나의 위치 x : ${xNum}, y : ${yNum}`
        document.getElementById('diff').innerHTML = diffPosition;

        if (xNum < -cactus.width && yNum <= cactus.height) {
            console.log(xNum, yNum)
            finishGame();
        }
    };
    function dieAction(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dieAnimation = requestAnimationFrame(dieAction);
        diffPosition = '실망입니다...';
        document.getElementById('diff').innerHTML = diffPosition;
    
        if (dying) {
            if (dieTimer > 500) {
                dieTimer = 0;
                dying = false;
                cancelAnimationFrame(dieAnimation);
                return false;
            } else if (dieTimer > 100) {
                dieTimer += speed * 2;
                dino.y += speed * 2;
            } else {
                dieTimer += speed * 2;
                dino.y -= speed * 2;
            }
        }

        dino.draw();
    };
    function finishGame(){
        cancelAnimationFrame(animation);
        dying = true;
        dieAction();
        console.log('end');
        document.getElementsByTagName('body')[0].classList.add('over');
        isEnd = true;
    }
    function reStartGame(){
        document.getElementsByTagName('body')[0].classList.remove('over');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animation = null;
        dieAnimation = null;
        timer = 0;
        cactusArray = [];
        jumping = false;
        jumpTimer = 0;
        isEnd = false;
        dino.x = 0;
        dino.y = 400;
        startGame();
    }

    startGame();
    document.addEventListener('keydown', function(e){
        if (e.code === 'Space') {
            if (isEnd) {
                reStartGame();
            } else {
                if (!jumping) {
                    jumping = true;
                }
            }
        }
    })
}



window.onload = function(){
    gameState();
}