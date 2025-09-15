document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.birthday-card');
    const cakeContainer = document.querySelector('.cake-container');
    const flames = document.querySelectorAll('.candle-flame');
    
    const backgroundElements = document.querySelector('.background-elements');
    const fireworksContainer = document.querySelector('.fireworks-container');
    const starsContainer = document.querySelector('.stars');

    const balloonColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#f72585', '#7209b7'];
    const confettiColors = ['#f25478', '#f8a84c', '#fce254', '#84d47c', '#54b4cc', '#6c6ce8', '#a864d4', '#e63946', '#f4a261', '#2a9d8f'];
    const fireworkColors = ['#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845', '#DAF7A6', '#FFC0CB', '#ADD8E6'];

    const NUM_BALLOONS = 15; 
    const NUM_CONFETTI = 100;
    const NUM_STARS = 180;
    const NUM_FIREWORKS = 5; // Número de fuegos artificiales en un ciclo
    const FIREWORK_PARTICLES = 30; // Partículas por cada fuego artificial


    // --- GENERACIÓN DE ELEMENTOS ---

    // Crear globos (caen desde arriba)
    for (let i = 0; i < NUM_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 95}vw`;
        balloon.style.setProperty('--x-offset', `${(Math.random() - 0.5) * 50}px`); // Movimiento lateral
        balloon.style.setProperty('--rotation', `${(Math.random() - 0.5) * 20}deg`); // Rotación
        balloon.style.animationDelay = `${Math.random() * 10}s`;
        balloon.style.animationDuration = `${Math.random() * 10 + 15}s`;
        balloon.style.setProperty('--color', balloonColors[i % balloonColors.length]);
        backgroundElements.appendChild(balloon);
    }

    // Crear confeti (caen desde arriba)
    for (let i = 0; i < NUM_CONFETTI; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -100}vh`; // Empiezan fuera de la pantalla
        confetti.style.width = `${Math.random() * 8 + 5}px`;
        confetti.style.height = `${Math.random() * 8 + 5}px`;
        confetti.style.setProperty('--color', confettiColors[i % confettiColors.length]);
        confetti.style.animationDelay = `${Math.random() * 10}s`;
        confetti.style.animationDuration = `${Math.random() * 8 + 7}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        backgroundElements.appendChild(confetti);
    }

    // Crear estrellas para la escena final
    for (let i = 0; i < NUM_STARS; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        const size = `${Math.random() * 2 + 1}px`;
        star.style.width = size;
        star.style.height = size;
        starsContainer.appendChild(star);
    }

    // --- FUNCIONES DE FUEGOS ARTIFICIALES ---
    function createFirework(x, y) {
        const fireworkDiv = document.createElement('div');
        fireworkDiv.className = 'firework';
        fireworkDiv.style.left = `${x}px`;
        fireworkDiv.style.top = `${y}px`;
        fireworksContainer.appendChild(fireworkDiv);

        const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

        for (let i = 0; i < FIREWORK_PARTICLES; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.setProperty('--particle-color', color);
            
            const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
            const speed = Math.random() * 80 + 30; // Velocidad de la partícula
            
            particle.style.setProperty('--dx', `${Math.cos(angle) * speed}px`);
            particle.style.setProperty('--dy', `${Math.sin(angle) * speed + 50}px`); // +50 para efecto de caída
            
            particle.style.animationDelay = `${Math.random() * 0.5}s`; // Pequeño delay
            fireworkDiv.appendChild(particle);
        }

        // Eliminar el firework después de su animación
        fireworkDiv.addEventListener('animationend', () => {
            fireworkDiv.remove();
        });
    }

    function launchFireworks() {
        for (let i = 0; i < NUM_FIREWORKS; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.6; // Solo en la parte superior
                createFirework(x, y);
            }, i * 800); // Lanzar cada firework con un pequeño retraso
        }
    }

    // Lanzar fuegos artificiales al cargar la página
    launchFireworks();
    // Repetir fuegos artificiales cada cierto tiempo
    setInterval(launchFireworks, NUM_FIREWORKS * 800 + 5000); // Ajusta el tiempo entre ráfagas


    // --- EVENTO DE CLIC EN LA TORTA ---
    cakeContainer.addEventListener('click', () => {
        // 1. Apagar las velas
        flames.forEach(flame => {
            flame.classList.add('out');
        });

        // 2. Activar la transición a la escena final
        card.classList.add('zoomed');

        // Opcional: Sonido de soplido de velas
        // const blowSound = new Audio('ruta/a/tu/sonido.mp3');
        // blowSound.play();
    });
});
