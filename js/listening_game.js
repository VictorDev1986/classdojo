document.addEventListener('DOMContentLoaded', () => {
    // Configuración inicial
    let score = 0;
    let currentQuestion = 0;
    let totalQuestions = 0;
    const questions = [
        {
            audio: "audio/sentence1.mp3",
            english: "The cat is black",
            spanish: "El gato es negro",
            hint: "A sentence about a black cat",
            image: "img/cat_black.png"
        },
        {
            audio: "audio/sentence2.mp3",
            english: "I have a red ball",
            spanish: "Tengo una pelota roja",
            hint: "A sentence about a red ball",
            image: "img/ball_red.jpg"
        },
        {
            audio: "audio/sentence3.mp3",
            english: "The sun is yellow",
            spanish: "El sol es amarillo",
            hint: "A sentence about a yellow sun",
            image: "img/The_sun_is_yellow.jpg"
        },
        {
            audio: "audio/sentence4.mp3",
            english: "I like to eat red apples",
            spanish: "Me gusta comer manzanas rojas",
            hint: "A sentence about red apples",
            image: "img/red_apple.jpg"
        }
    ];

    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    const progressBar = document.querySelector('.progress');
    const playButton = document.getElementById('play-audio');
    const audioWaveform = document.getElementById('audio-waveform');
    const resetButton = document.getElementById('resetButton');
    const submitButton = document.getElementById('submit-btn');
    const userAnswer = document.getElementById('user-answer');
    const englishSentence = document.getElementById('english-sentence');
    const questionImage = document.getElementById('question-image');

    totalQuestions = questions.length;
    let audio = new Audio();
    let isPlaying = false;

    // Función para mostrar una nueva pregunta
    function showQuestion() {
        const question = questions[currentQuestion];
        audio.src = question.audio;
        audioWaveform.innerHTML = '<div class="wave"></div>';
        englishSentence.textContent = question.english;
        
        // Mostrar la imagen
        questionImage.innerHTML = `<img src="${question.image}" alt="${question.english}">`;
        
        userAnswer.value = '';
        userAnswer.placeholder = 'Escribe la traducción en español...';
        feedbackElement.textContent = '';
        submitButton.disabled = false;
        progressBar.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
    }

    // Función para reproducir/pausar audio
    function toggleAudio() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            audio.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    }

    // Función para verificar respuesta
    function checkAnswer() {
        const userAnswerText = userAnswer.value.trim().toLowerCase();
        const correctAnswer = questions[currentQuestion].spanish.toLowerCase();

        // Verificar si la respuesta es correcta (permitiendo algunas variaciones)
        const isCorrect = userAnswerText === correctAnswer ||
                         userAnswerText === correctAnswer.replace('el ', '') ||
                         userAnswerText === correctAnswer.replace('la ', '') ||
                         userAnswerText === correctAnswer.replace('los ', '') ||
                         userAnswerText === correctAnswer.replace('las ', '') ||
                         userAnswerText === correctAnswer.replace('un ', '') ||
                         userAnswerText === correctAnswer.replace('una ', '') ||
                         userAnswerText === correctAnswer.replace('unos ', '') ||
                         userAnswerText === correctAnswer.replace('unas ', '');

        if (isCorrect) {
            feedbackElement.className = 'feedback-container feedback-correct';
            feedbackElement.textContent = '¡Correcto! +10 puntos';
            score += 10;
            scoreElement.textContent = score;
        } else {
            feedbackElement.className = 'feedback-container feedback-incorrect';
            feedbackElement.textContent = `Incorrecto. La respuesta correcta es: ${questions[currentQuestion].spanish}`;
        }

        // Avanzar a la siguiente pregunta después de un breve retraso
        currentQuestion++;
        submitButton.disabled = true;
        
        if (currentQuestion < totalQuestions) {
            setTimeout(showQuestion, 1500);
        } else {
            setTimeout(showFinalScore, 1500);
        }
    }

    // Función para mostrar puntuación final
    function showFinalScore() {
        // Calcular puntaje máximo posible
        const maxScore = totalQuestions * 10;
        const perfectScore = score === maxScore;

        // Crear el modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        if (perfectScore) {
            // Modal de medallas (puntuación perfecta)
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="medals-container">
                        <img src="img/medalla.png" alt="Bronze Medal" class="medal">
                        <img src="img/medalla.png" alt="Silver Medal" class="medal">
                        <img src="img/medalla.png" alt="Gold Medal" class="medal">
                    </div>
                    <h2>Congratulations!</h2>
                    <p>You completed the game with a perfect score!</p>
                    <div class="score-container">
                        <span>Final Score: <span id="final-score">${score} out of ${maxScore} points</span></span>
                    </div>
                    <button class="close-modal" onclick="window.location.href='pagina_2.html'">Close</button>
                </div>
            `;
        } else {
            // Modal de Game Over
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="medals-container">
                        <img src="img/medalla.png" alt="Medal" class="medal">
                    </div>
                    <h2>Game Over</h2>
                    <p>Your final score: ${score} out of ${maxScore} points</p>
                    <p>Keep practicing to get all the medals!</p>
                    <button class="close-modal" onclick="window.location.href='pagina_2.html'">Close</button>
                </div>
            `;
        }
        
        document.body.appendChild(modal);
    }

    // Event listeners
    playButton.addEventListener('click', toggleAudio);
    resetButton.addEventListener('click', () => {
        location.reload();
    });
    submitButton.addEventListener('click', checkAnswer);

    // Iniciar el juego
    showQuestion();
});