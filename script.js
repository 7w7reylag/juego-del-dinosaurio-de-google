const dragon = document.getElementById('dragon');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;

// Función para hacer saltar al dragón
function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                jumpHeight -= 20;
                dragon.style.bottom = jumpHeight + 'px';
            }, 20);
        }
        jumpHeight += 20;
        dragon.style.bottom = jumpHeight + 'px';
    }, 20);
}

// Función para manejar la colisión
function detectCollision() {
    const dragonRect = dragon.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dragonRect.x < obstacleRect.x + obstacleRect.width &&
        dragonRect.x + dragonRect.width > obstacleRect.x &&
        dragonRect.y < obstacleRect.y + obstacleRect.height &&
        dragonRect.height + dragonRect.y > obstacleRect.y
    ) {
        alert(`¡Game Over! Tu puntuación final es: ${score}`);
        clearInterval(obstacleMovement);
        document.location.reload(); // Reinicia el juego
    }
}

// Movimiento del obstáculo
let obstacleMovement = setInterval(() => {
    const obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
    if (obstaclePosition >= window.innerWidth) {
        obstacle.style.right = '-20px';
        score++;
        scoreDisplay.innerText = `Puntuación: ${score}`;
    } else {
        obstacle.style.right = obstaclePosition + 10 + 'px';
    }
    detectCollision();
}, 100);

// Evento de tecla para saltar
document.addEventListener('keydown', jump);
