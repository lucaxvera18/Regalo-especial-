document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.birthday-card');
    const cakeContainer = document.querySelector('.cake-container');
    const flames = document.querySelectorAll('.candle-flame');
    const music = document.getElementById('birthday-music');
    
    const backgroundElements = document.querySelector('.background-elements');
    const fireworksContainer = document.querySelector('.fireworks-container');
    const starsContainer = document.querySelector('.stars');
    const sparkleContainer = document.querySelector('.sparkle-container');

    let musicPlayed = false;
    let canCreateSparkle = true;

    const confettiColors = ['#f25478', '#f8a84c', '#fce254', '#84d47c', '#54b4cc', '#6c6ce8', '#a864d4', '#e63946', '#f4a261', '#2a9d8f'];
    const fireworkColors = ['#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845', '#DAF7A6', '#FFC0CB', '#ADD8E6'];

    const NUM_CONFETTI = 100;
    const NUM_STARS = 180;
    const NUM_FIREWORKS = 5;
    const FIREWORK_PARTICLES = 30;

    // --- GENERACIÓN DE ELEMENTOS ---
    for (let i = 0; i < NUM_CONFETTI; i++) { /* ... (código de confeti sin cambios) ... */ }
    for (let i = 0; i < NUM_STARS; i++) { /* ... (código de estrellas sin cambios) ... */ }
    
    // (El código de confeti y estrellas es largo, si quieres lo pongo completo, pero no ha cambiado)
    // Crear confeti
    for (let i = 0; i < NUM_CONFETTI; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -100}vh`;
        confetti.style.width = `${Math.random() * 8 + 5}px`;
        confetti.style.height = `${Math.random() * 8 + 5}px`;
        confetti.style.setProperty('--color', confettiColors[i % confettiColors.length]);
        confetti.style.animationDelay = `${Math.random() * 10}s`;
        confetti.style.animationDuration = `${Math.random() * 8 + 7}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
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
        star.style.width = size; star.style.height = size;
        starsContainer.appendChild(star);
    }


    // --- FUEGOS ARTIFICIALES ---
    function createFirework(x, y) { /* ... (código de fuegos artificiales sin cambios) ... */ }
    function launchFireworks() { /* ... (código de fuegos artificiales sin cambios) ... */ }
    
    // (Pongo el código de fuegos artificiales por si acaso)
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
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 80 + 30;
            particle.style.setProperty('--dx', `${Math.cos(angle) * speed}px`);
            particle.style.setProperty('--dy', `${Math.sin(angle) * speed + 50}px`);
            particle.style.animationDelay = `${Math.random() * 0.5}s`;
            fireworkDiv.appendChild(particle);
        }
        fireworkDiv.addEventListener('animationend', () => fireworkDiv.remove());
    }
    function launchFireworks() {
        for (let i = 0; i < NUM_FIREWORKS; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.6;
                createFirework(x, y);
            }, i * 800);
        }
    }
    launchFireworks();
    setInterval(launchFireworks, NUM_FIREWORKS * 800 + 5000);


    // --- NUEVA FUNCIÓN DE PARTÍCULAS BRILLANTES ---
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        // Añadir un pequeño offset aleatorio para que no sea una línea perfecta
        sparkle.style.left = `${x + (Math.random() - 0.5) * 20}px`;
        sparkle.style.top = `${y + (Math.random() - 0.5) * 20}px`;
        sparkleContainer.appendChild(sparkle);
        // Eliminar la partícula del DOM después de la animación para no sobrecargar la página
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // --- EVENT LISTENERS ---
    
    // Para mouse (PC)
    document.addEventListener('mousemove', (e) => {
        if (canCreateSparkle) {
            createSparkle(e.clientX, e.clientY);
            canCreateSparkle = false;
            setTimeout(() => {
                canCreateSparkle = true;
            }, 50); // Limita la creación de partículas para un buen rendimiento
        }
    });

    // Para touch (móviles)
    document.addEventListener('touchmove', (e) => {
        if (canCreateSparkle) {
            // Usar el primer punto de contacto
            const touch = e.touches[0];
            createSparkle(touch.clientX, touch.clientY);
            canCreateSparkle = false;
            setTimeout(() => {
                canCreateSparkle = true;
            }, 50);
        }
    });

    // Evento de clic en la torta
    cakeContainer.addEventListener('click', () => {
        if (!musicPlayed) {
            music.play().catch(error => {
                console.log("La reproducción fue bloqueada por el navegador.");
            });
            musicPlayed = true;
        }
        flames.forEach(flame => flame.classList.add('out'));
        card.classList.add('zoomed');
    });
});
