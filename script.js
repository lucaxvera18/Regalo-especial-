document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const card = document.querySelector('.birthday-card');
    const cakeContainer = document.querySelector('.cake-container');
    // const flames = document.querySelectorAll('.candle-flame'); // Eliminado
    const music = document.getElementById('birthday-music');
    const sparkleContainer = document.querySelector('.sparkle-container');
    const backgroundElements = document.querySelector('.background-elements');
    const fireworksContainer = document.querySelector('.fireworks-container');
    const starsContainer = document.querySelector('.stars');

    // --- VARIABLES DE ESTADO ---
    let musicPlayed = false;
    let sparkleInterval;

    // --- CONFIGURACIÓN ---
    const confettiColors = ['#f25478', '#f8a84c', '#fce254', '#84d47c', '#54b4cc', '#6c6ce8', '#a864d4'];
    const fireworkColors = ['#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845'];
    const NUM_CONFETTI = 100;
    const NUM_STARS = 180;
    const NUM_FIREWORKS = 5;
    const FIREWORK_PARTICLES = 30;

    // --- FUNCIONES DE CREACIÓN ---
    
    // Crear confeti
    for (let i = 0; i < NUM_CONFETTI; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 10}s`;
        confetti.style.animationDuration = `${Math.random() * 8 + 7}s`;
        confetti.style.setProperty('--color', confettiColors[i % confettiColors.length]);
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

    // Crear fuegos artificiales (con lanzador ascendente)
    function createFirework(x, y) {
        const launcher = document.createElement('div');
        launcher.className = 'firework-launcher';
        launcher.style.left = `${x}px`;
        launcher.style.top = `${window.innerHeight}px`; // Empieza desde abajo de la pantalla
        fireworksContainer.appendChild(launcher);

        // La explosión ocurre en la posición final del lanzador
        const explosionX = x;
        const explosionY = y; // La altura a la que explota

        launcher.style.setProperty('--final-y', `${explosionY}px`); // CSS lo anima a subir

        launcher.addEventListener('animationend', () => {
            launcher.remove(); // Elimina el lanzador después de que sube

            const fireworkDiv = document.createElement('div');
            fireworkDiv.className = 'firework';
            fireworkDiv.style.left = `${explosionX}px`;
            fireworkDiv.style.top = `${explosionY}px`;
            fireworksContainer.appendChild(fireworkDiv);
            const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
            for (let i = 0; i < FIREWORK_PARTICLES; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.setProperty('--particle-color', color);
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 80 + 30;
                particle.style.setProperty('--dx', `${Math.cos(angle) * speed}px`);
                particle.style.setProperty('--dy', `${Math.sin(angle) * speed + 50}px`);
                fireworkDiv.appendChild(particle);
            }
            setTimeout(() => fireworkDiv.remove(), 2000); // Elimina la explosión después de 2s
        }, { once: true });
    }


    function launchFireworks() {
        for (let i = 0; i < NUM_FIREWORKS; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.6;
                createFirework(x, y);
            }, i * 1500); // Intervalo más largo para apreciar el ascenso
        }
    }
    
    // Crear partículas brillantes interactivas
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkleContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }

    // --- MANEJADORES DE EVENTOS ---
    
    // Evento de clic en la torta
    cakeContainer.addEventListener('click', () => {
        if (!musicPlayed) {
            music.play().catch(e => console.error("Error al reproducir música:", e));
            musicPlayed = true;
        }
        // flames.forEach(flame => flame.classList.add('out')); // Eliminado
        card.classList.add('zoomed');
    });
    
    // Eventos para partículas interactivas (Mouse y Touch)
    function handlePointerMove(x, y) {
        if (!sparkleInterval) {
            sparkleInterval = setInterval(() => {
                createSparkle(x, y);
            }, 100);
        }
        createSparkle(x, y);
    }

    function handlePointerStop() {
        clearInterval(sparkleInterval);
        sparkleInterval = null;
    }

    window.addEventListener('mousemove', e => handlePointerMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', e => {
        e.preventDefault(); // Evita que la página haga scroll en móvil
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    });
    
    window.addEventListener('mouseup', handlePointerStop);
    window.addEventListener('touchend', handlePointerStop);

    // --- INICIO ---
    launchFireworks();
    setInterval(launchFireworks, NUM_FIREWORKS * 1500 + 5000); // Ajustar el intervalo de fuegos
});
