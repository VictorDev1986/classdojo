document.addEventListener('DOMContentLoaded', () => {
    // Configuración inicial
    let score = 0;
    let currentQuestion = 0;
    const questions = [
        {
            sentence: "The cat is sleeping on the sofa.",
            question: "What is sleeping?",
            options: [
                {
                    image: "img/cat_sofa.png",
                    text: "The cat",
                    correct: true
                },
                {
                    image: "img/cat_room.png",
                    text: "the room",
                    correct: false
                }
            ]
        },
        {
            sentence: "The boy is playing soccer.",
            question: "What is the boy doing?",
            options: [
                {
                    image: "img/bicycle.png",
                    text: "bicycle",
                    correct: false
                },
                {
                    image: "img/futbol.png",
                    text: "soccer",
                    correct: true
                }
            ]
        },
        {
            sentence: "The children are playing in the playground.",
            question: "What are the children doing?",
            options: [
                {
                    image: "img/children playing.png",
                    text: "Playing",
                    correct: true
                },
                {
                    image: "img/reading_game.png",
                    text: "Sleeping",
                    correct: false
                }
            ]
        }
    ];

    const scoreElement = document.getElementById('score');
    const sentenceElement = document.getElementById('sentence');
    const optionsContainer = document.getElementById('options');
    const resetButton = document.getElementById('resetButton');

    // Función para mostrar una nueva pregunta
    function showQuestion() {
        const question = questions[currentQuestion];
        sentenceElement.textContent = question.sentence;
        optionsContainer.innerHTML = '';

        // Crear opciones
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <img src="${option.image}" alt="${option.text}">
                <span>${option.text}</span>
            `;
            optionElement.addEventListener('click', () => checkAnswer(optionElement, option));
            optionsContainer.appendChild(optionElement);
        });
    }

    // Función para verificar la respuesta
    function checkAnswer(optionElement, option) {
        if (option.correct) {
            // Mostrar opción correcta en verde
            optionElement.style.background = '#4CAF50';
            score += 10;
            scoreElement.textContent = score;
        } else {
            // Mostrar opción incorrecta en rojo
            optionElement.style.background = '#f44336';
            score -= 5;
            if (score < 0) score = 0;
            scoreElement.textContent = score;
        }

        // Deshabilitar todas las opciones
        optionsContainer.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Mostrar botón de siguiente pregunta
        const nextButton = document.createElement('button');
        nextButton.className = 'button';
        nextButton.textContent = 'Next Question';
        nextButton.addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showFinalScore();
            }
        });
        optionsContainer.appendChild(nextButton);
    }

    // Función para mostrar la puntuación final
    function showFinalScore() {
        sentenceElement.textContent = '¡Congratulations! You have completed the game!';
        optionsContainer.innerHTML = `
            <div class="score-container">
                <span>Final Score: <span id="final-score">${score}</span></span>
            </div>
        `;
    }

    // Event listeners
    resetButton.addEventListener('click', () => {
        score = 0;
        currentQuestion = 0;
        scoreElement.textContent = score;
        showQuestion();
    });

    // Iniciar el juego
    showQuestion();
});
