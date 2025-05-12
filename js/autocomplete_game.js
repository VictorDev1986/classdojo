// Juego de unir palabras español-inglés al estilo Duolingo con puntaje y modal de medalla
document.addEventListener('DOMContentLoaded', () => {
    // Configuración inicial
    const wordPairs = [
        { spanish: "gato", english: "cat" },
        { spanish: "perro", english: "dog" },
        { spanish: "casa", english: "house" },
        { spanish: "libro", english: "book" },
        { spanish: "escuela", english: "school" },
        { spanish: "manzana", english: "apple" },
        { spanish: "ventana", english: "window" }
    ];

    let score = 0;
    let currentSelections = {};
    let matchesFound = 0;
    
    const matchingContainer = document.getElementById('matching-container');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    const checkButton = document.getElementById('checkBtn');
    const restartButton = document.getElementById('restartBtn');
    
    // Función para barajar un array
    function shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // Inicializar el juego
    function initGame() {
        matchingContainer.innerHTML = '';
        currentSelections = {};
        matchesFound = 0;
        score = 0;
        scoreElement.textContent = score;
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback-message';
        checkButton.disabled = false;
        
        // Barajar las palabras en español
        const shuffledSpanish = shuffle(wordPairs);
        
        // Crear todas las opciones en inglés (barajadas)
        const allEnglishOptions = shuffle(wordPairs.map(pair => pair.english));
        
        // Crear filas para cada palabra en español
        shuffledSpanish.forEach((pair, index) => {
            const row = document.createElement('div');
            row.className = 'word-row';
            row.dataset.spanish = pair.spanish;
            row.dataset.english = pair.english;
            
            // Palabra en español
            const spanishWord = document.createElement('div');
            spanishWord.className = 'spanish-word';
            spanishWord.textContent = pair.spanish;
            row.appendChild(spanishWord);
            
            // Contenedor para opciones en inglés
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'english-options';
            
            // Generar 3 opciones (incluida la correcta)
            let options = [pair.english]; // Opción correcta
            
            // Añadir 2 opciones incorrectas (sin repetir)
            while (options.length < 3) {
                const randomOption = allEnglishOptions[Math.floor(Math.random() * allEnglishOptions.length)];
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }
            
            // Barajar las opciones
            options = shuffle(options);
            
            // Crear botones para cada opción
            options.forEach(option => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'english-option';
                optionBtn.textContent = option;
                optionBtn.addEventListener('click', () => selectOption(row, optionBtn, option));
                optionsContainer.appendChild(optionBtn);
            });
            
            row.appendChild(optionsContainer);
            matchingContainer.appendChild(row);
        });
    }
    
    // Manejar la selección de una opción
    function selectOption(row, optionBtn, selectedOption) {
        const spanishWord = row.dataset.spanish;
        
        // Eliminar selección anterior si existe
        row.querySelectorAll('.english-option').forEach(btn => {
            btn.classList.remove('selected');
            btn.classList.remove('incorrect');
        });
        
        // Marcar la nueva selección
        optionBtn.classList.add('selected');
        
        // Guardar la selección actual
        currentSelections[spanishWord] = selectedOption;
    }
    
    // Verificar respuestas al hacer clic en el botón Verificar
    function checkAnswers() {
        if (Object.keys(currentSelections).length === 0) {
            feedbackElement.textContent = "Select at least one answer";
            return;
        }
        
        let allCorrect = true;
        let correctCount = 0;
        
        // Revisar cada selección
        Object.entries(currentSelections).forEach(([spanish, selectedEnglish]) => {
            const row = document.querySelector(`.word-row[data-spanish="${spanish}"]`);
            const correctEnglish = row.dataset.english;
            
            if (selectedEnglish === correctEnglish) {
                // Respuesta correcta
                correctCount++;
                row.classList.add('matched');
                matchesFound++;
                
                // Marcar los botones no seleccionados como deshabilitados
                row.querySelectorAll('.english-option:not(.selected)').forEach(btn => {
                    btn.disabled = true;
                });
            } else {
                // Respuesta incorrecta
                allCorrect = false;
                row.querySelector('.english-option.selected').classList.add('incorrect');
            }
        });
        
        // Actualizar puntuación y mostrar feedback
        if (correctCount > 0) {
            const pointsEarned = correctCount * 10;
            score += pointsEarned;
            scoreElement.textContent = score;
            
            if (allCorrect) {
                feedbackElement.textContent = `Excellent! +${pointsEarned} points`;
                feedbackElement.className = 'feedback-message feedback-correct';
            } else {
                feedbackElement.textContent = `${correctCount} correct (+${pointsEarned} points). Keep trying!`;
                feedbackElement.className = 'feedback-message feedback-correct';
            }
        } else {
            score -= 5;
            if (score < 0) score = 0;
            scoreElement.textContent = score;
            feedbackElement.textContent = "Incorrect. Try again. (-5 points)";
            feedbackElement.className = 'feedback-message feedback-incorrect';
        }
        
        // Limpiar selecciones actuales
        currentSelections = {};
        
        // Verificar si todas las palabras han sido emparejadas correctamente
        if (matchesFound === wordPairs.length) {
            setTimeout(showFinalScore, 1000);
        }
    }
    
    // Mostrar puntuación final y modal
    function showFinalScore() {
        // Crear el modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="img/medalla.png" alt="Medal" class="medal">
                <h2>Congratulations!</h2>
                <p>You have completed the game!</p>
                <div class="score-container">
                    <span>Final Score: <span id="final-score">${score}</span></span>
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Añadir evento para cerrar el modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            window.location.href = 'pagina_2.html';
        });
        
        // Ocultar el contenido del juego
        document.querySelector('.autocomplete-game').style.display = 'none';
    }
    
    // Event listeners
    checkButton.addEventListener('click', checkAnswers);
    restartButton.addEventListener('click', initGame);
    
    // Iniciar el juego
    initGame();
});
