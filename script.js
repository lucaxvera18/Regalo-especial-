document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.birthday-card');
    const cake = document.querySelector('.cake');
    const flames = document.querySelectorAll('.flame');
    
    const backgroundElements = document.querySelector('.background-elements');
    const starsContainer = document.querySelector('.stars');

    const balloonColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
    const confettiColors = ['#f25478', '#f8a84c', '#fce254', '#84d47c', '#54b4cc', '#6c6ce8', '#a864d4'];

    const NUM_BALLOONS = 12;
    const NUM_CONFETTI = 100;
    const NUM_STARS = 150;

    // --- GENERACIÓN DE ELEMENTOS ---

    // Crear globos
    for (let i = 0; i < NUM_BALLOONS; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 95}vw`;
        balloon.style.top = `${Math.random() * 20 + 80}vh`;
        balloon.style.setProperty('--color', balloonColors[i % balloonColors.length]);
        balloon.style.animationDelay = `${Math.random() * 5}s`;
        balloon.style.animationDuration = `${Math.random() * 8 + 12}s`;
        backgroundElements.appendChild(balloon);
    }

    // Crear confeti
    for (let i = 0; i < NUM_CONFETTI; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.setProperty('--color', confettiColors[i % confettiColors.length]);
        confetti.style.animationDelay = `${Math.random() * 8}s`;
        confetti.style.animationDuration = `${Math.random() * 5 + 5}s`;
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

        // 2. Activar el zoom y la transición de escena
        card.classList.add('zoomed');
    });
});
