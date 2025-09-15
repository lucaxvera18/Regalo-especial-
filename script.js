document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.birthday-card');
    const cake = document.querySelector('.cake');
    const flames = document.querySelectorAll('.flame');
    
    const backgroundElements = document.querySelector('.background-elements');
    const starsContainer = document.querySelector('.stars');

    const balloonColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#f72585', '#7209b7'];
    const confettiColors = ['#f25478', '#f8a84c', '#fce254', '#84d47c', '#54b4cc', '#6c6ce8', '#a864d4', '#e63946', '#f4a261', '#2a9d8f'];

    const NUM_BALLOONS = 20; // Más globos para un efecto más festivo
    const NUM_CONFETTI = 150; // Más confeti
    const NUM_STARS = 180; // Más estrellas para el fondo final

    // --- GENERACIÓN DE ELEMENTOS ---

    // Crear globos
    for (let i = 0; i < NUM_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 95}vw`;
        balloon.style.bottom = `${Math.random() * 5 - 10}vh`; // Empiezan desde abajo o fuera de la vista
        balloon.style.setProperty('--color', balloonColors[i % balloonColors.length]);
        balloon.style.animationDelay = `${Math.random() * 10}s`; // Mayor variación en el inicio
        balloon.style.animationDuration = `${Math.random() * 10 + 15}s`; // Mayor duración
        backgroundElements.appendChild(balloon);
    }

    // Crear confeti
    for (let i = 0; i < NUM_CONFETTI; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -100}vh`; // Empiezan desde arriba
        confetti.style.width = `${Math.random() * 8 + 5}px`; // Tamaños variados
        confetti.style.height = `${Math.random() * 8 + 5}px`;
        confetti.style.setProperty('--color', confettiColors[i % confettiColors.length]);
        confetti.style.animationDelay = `${Math.random() * 10}s`;
        confetti.style.animationDuration = `${Math.random() * 8 + 7}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Rotación inicial
        backgroundElements.appendChild(confetti);
    }

    // Crear estrellas
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


    // --- EVENTO DE CLIC ---

    cake.addEventListener('click', () => {
        // 1. Apagar las velas
        flames.forEach(flame => {
            flame.classList.add('out');
        });

        // 2. Activar la transición a la escena final (ya no hay zoom en la tarjeta completa)
        card.classList.add('zoomed');

        // Opcional: Sonido de soplido de velas
        // const blowSound = new Audio('ruta/a/tu/sonido.mp3');
        // blowSound.play();
    });
});
