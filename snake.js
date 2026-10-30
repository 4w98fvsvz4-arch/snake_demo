const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

canvas.width = 400;
canvas.height = 400;
const size = 20;
let snake = [{x:10, y:10}];
let food = {x:15, y:15};
let dx = 1, dy = 0;
let score = 0;

document.addEventListener("keydown", e=>{
    if(e.key === "ArrowLeft" && dx!==1){dx=-1;dy=0}
    if(e.key === "ArrowRight" && dx!==-1){dx=1;dy=0}
    if(e.key === "ArrowUp" && dy!==1){dx=0;dy=-1}
    if(e.key === "ArrowDown" && dy!==-1){dx=0;dy=1}
})

function draw(){
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f0";
    snake.forEach(seg=>{
        ctx.fillRect(seg.x*size, seg.y*size, size-2, size-2);
    })

    ctx.fillStyle="#f00";
    ctx.fillRect(food.x*size, food.y*size, size-2, size-2);

    let head = {x:snake[0].x+dx, y:snake[0].y+dy};
    //撞墙重置
    if(head.x<0||head.y<0||head.x>=20||head.y>=20) reset();
    //撞到自己重置
    for(let s of snake){
        if(s.x===head.x && s.y===head.y) reset();
    }

    snake.unshift(head);
    if(head.x===food.x && head.y===food.y){
        score +=10;
        scoreText.innerText=score;
        food = {x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)}
    }else{
        snake.pop();
    }
}
function reset(){
    snake = [{x:10,y:10}];
    dx=1;dy=0;score=0;
    scoreText.innerText=0;
}
setInterval(draw,120);
