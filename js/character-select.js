// Funcionalidad para la selección de personajes
document.addEventListener('DOMContentLoaded', () => {
    const characterCards = document.querySelectorAll('.character-card');
    const selectedDisplay = document.getElementById('selected-display');
    const continueBtn = document.getElementById('continue-btn');

    // Función para manejar la selección de personaje
    const handleCharacterSelect = (event) => {
        // Remover la clase selected de todas las tarjetas
        characterCards.forEach(card => card.classList.remove('selected'));
        
        // Agregar la clase selected a la tarjeta seleccionada
        event.currentTarget.classList.add('selected');
        
        // Actualizar el display del personaje seleccionado
        const character = event.currentTarget.getAttribute('data-character');
        const characterName = event.currentTarget.querySelector('h2').textContent;
        
        selectedDisplay.innerHTML = `
            <div class="selected-character-info">
                <h3>${characterName}</h3>
            </div>
        `;
        
        // Habilitar el botón de continuar
        continueBtn.disabled = false;
        continueBtn.style.opacity = '1';
        continueBtn.style.cursor = 'pointer';
    };

    // Agregar eventos a las tarjetas de personajes
    characterCards.forEach(card => {
        card.addEventListener('click', handleCharacterSelect);
    });

    // Manejar el evento de continuar
    continueBtn.addEventListener('click', () => {
        // Aquí puedes agregar la lógica para guardar la selección del personaje
        const selectedCharacter = document.querySelector('.character-card.selected');
        if (selectedCharacter) {
            const character = selectedCharacter.getAttribute('data-character');
            localStorage.setItem('selectedCharacter', character);
        }
    });
});
