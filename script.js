let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let vidaPlayer = document.getElementById('vida');
let box = 32;
let pontos = 0;
let vidas = 3;
let vidasPeridas = 0;
let velocidade = 230;
let jogo = function(){};
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos

let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
} 

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
function drawHealth(){
    //<i style='font-size:15px' class='fas'>&#xf004;</i>
    for (;vidasPeridas < vidas; vidasPeridas++){
        vidaPlayer.innerHTML += "<i style='font-size:15px' class='fas'>&#xf004;</i>";
    }
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){



            if(vidas == 0 || vidas < 0){
                clearInterval(jogo);
                alert('Game Over :(');
                location.reload();
            }else{
            partida = confirm('A cobrinha morreu :( \n Você gostaria de jogar novamente?');
                if(partida){
                    vidas -= 1;
                    snake[0] ={
                        x: 8 * box,
                        y: 8 * box
                    }
                    document.querySelector('span#vida i.fas').remove();
                }
            }
        }
    }


    criarBG();    
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
        
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        pontos += 10;
        Velocidade(velocidade * velocidade  - 20);
        document.querySelector('span#pontos').innerText = pontos;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}
function Velocidade(vel) {
    jogo = setInterval(iniciarJogo, vel);
}
function main(){
    snake[0] ={
        x: 8 * box,
        y: 8 * box
    }
    

    snakeX = snake[0].x;
    snakeY = snake[0].y;
    
    drawHealth();
    vidas = 3;
    pontos = 0;
    Velocidade(velocidade);
}

main();