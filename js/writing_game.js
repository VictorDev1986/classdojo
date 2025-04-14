document.addEventListener('DOMContentLoaded', () => {
    // Configuración inicial
    let score = 0;
    let currentQuestion = 0;
    let totalQuestions = 0;
    const questions = [
        {
            sentence: "The ___ is black.",
            answer: "cat",
            hint: "It's a small animal that says 'meow'",
            image: "img/cat_game.png",
            pronunciation: "cat"
        },
        {
            sentence: "I have a red ___.",
            answer: "ball",
            hint: "It's round and you can play with it",
            image: "img/ball.png",
            pronunciation: "ball"
        },
        {
            sentence: "The ___ is brown.",
            answer: "dog",
            hint: "It's a friendly pet that says 'woof'",
            image: "img/dog.png",
            pronunciation: "dog"
        },
        {
            sentence: "I like to eat red ___.",
            answer: "apple",
            hint: "It's a fruit that grows on trees",
            image: "img/apple.png",
            pronunciation: "apple"
        }
    ];

    const scoreElement = document.getElementById('score');
    const sentenceElement = document.getElementById('current-sentence');
    const feedbackElement = document.getElementById('feedback');
    const progressBar = document.querySelector('.progress');
    const inputElement = document.getElementById('user-answer');
    const submitButton = document.getElementById('submit-btn');
    const resetButton = document.getElementById('resetButton');
    const imageElement = document.getElementById('question-image');
    const hintButton = document.getElementById('show-hint');
    const hintText = document.getElementById('hint-text');

    totalQuestions = questions.length;

    // Función para mostrar una nueva pregunta
    function showQuestion() {
        const question = questions[currentQuestion];
        sentenceElement.innerHTML = question.sentence.replace('___', '<span>___</span>');
        inputElement.value = '';
        feedbackElement.textContent = '';
        submitButton.disabled = false;
        progressBar.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
        
        // Mostrar la imagen
        imageElement.src = question.image;
        imageElement.alt = question.answer;
        
        // Resetear la pista
        hintText.classList.remove('visible');
        hintText.textContent = question.hint;
    }

    // Función para verificar la respuesta
    function checkAnswer() {
        const userAnswer = inputElement.value.toLowerCase().trim();
        const correctAnswer = questions[currentQuestion].answer;

        if (userAnswer === correctAnswer) {
            feedbackElement.className = 'feedback-container feedback-correct';
            feedbackElement.textContent = '¡Correcto! +10 puntos';
            score += 10;
            scoreElement.textContent = score;
            currentQuestion++;

            if (currentQuestion < totalQuestions) {
                showQuestion();
            } else {
                showFinalScore();
            }
        } else {
            feedbackElement.className = 'feedback-container feedback-incorrect';
            feedbackElement.textContent = 'Incorrecto. Try again!';
            score -= 5;
            if (score < 0) score = 0;
            scoreElement.textContent = score;
        }
    }

    // Función para mostrar la puntuación final
    function showFinalScore() {
        sentenceElement.textContent = '¡Felicidades! Has completado el juego!';
        feedbackElement.textContent = `Tu puntuación final es: ${score} puntos`;
        submitButton.disabled = true;
        inputElement.disabled = true;
    }

    // Event listeners
    submitButton.addEventListener('click', () => {
        checkAnswer();
    });

    inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    hintButton.addEventListener('click', () => {
        hintText.classList.add('visible');
        // Restar puntos por usar la pista
        score -= 2;
        if (score < 0) score = 0;
        scoreElement.textContent = score;
    });

    resetButton.addEventListener('click', () => {
        score = 0;
        currentQuestion = 0;
        scoreElement.textContent = score;
        showQuestion();
    });

    // Iniciar el juego
    showQuestion();
});
