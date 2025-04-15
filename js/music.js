// Configuración de la música
const audio = new Audio('audio/jungle-ish-beat-for-video-games-314073.mp3');

// Configuración
audio.volume = 0.3; // Volumen al 30%
audio.loop = true;  // Repetir automáticamente

// Intentar reproducir la música cuando el usuario interactúe con la página
let hasPlayed = false;

document.addEventListener('click', () => {
    if (!hasPlayed) {
        try {
            audio.play().catch(error => {
                console.log('Error al reproducir:', error);
            });
            hasPlayed = true;
        } catch (error) {
            console.log('Error al reproducir:', error);
        }
    }
});

// Intentar reproducir la música cuando se cargue la página
window.addEventListener('load', () => {
    if (!hasPlayed) {
        try {
            audio.play().catch(error => {
                console.log('Error al reproducir:', error);
            });
            hasPlayed = true;
        } catch (error) {
            console.log('Error al reproducir:', error);
        }
    }
});
