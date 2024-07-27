document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Cuál es la capital de Francia?",
            answers: ["Berlín", "Madrid", "París", "Lisboa"],
            correct: 2
        },
        {
            question: "¿En qué año comenzó la Segunda Guerra Mundial?",
            answers: ["1939", "1941", "1936", "1945"],
            correct: 0
        },
        {
            question: "¿Quién pintó la Mona Lisa?",
            answers: ["Vincent van Gogh", "Claude Monet", "Leonardo da Vinci", "Pablo Picasso"],
            correct: 2
        },
        {
            question: "¿Cuál es el elemento químico con símbolo 'O'?",
            answers: ["Oro", "Osmio", "Oxígeno", "Ombre"],
            correct: 2
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    const timerDuration = 30;

    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('next-button');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-button');
    const feedbackElement = document.getElementById('feedback');
    const feedbackMessageElement = document.getElementById('feedback-message');
    const timerElement = document.getElementById('timer');

    function startTimer() {
        let timeLeft = timerDuration;
        timerElement.textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                nextButton.click();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function showQuestion() {
        stopTimer();
        startTimer();
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        answersElement.innerHTML = '';

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => checkAnswer(index));
            answersElement.appendChild(button);
        });

        nextButton.classList.add('hidden');
        feedbackElement.classList.add('hidden');
    }

    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        const buttons = Array.from(answersElement.children);

        if (selectedIndex === question.correct) {
            score++;
            feedbackMessageElement.textContent = "¡Correcto!";
            buttons[selectedIndex].classList.add('correct');
        } else {
            feedbackMessageElement.textContent = "Incorrecto. La respuesta correcta era: " + question.answers[question.correct];
            buttons[selectedIndex].classList.add('incorrect');
            buttons[question.correct].classList.add('correct');
        }

        stopTimer();
        feedbackElement.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }

    function showScore() {
        questionElement.classList.add('hidden');
        answersElement.classList.add('hidden');
        nextButton.classList.add('hidden');
        timerElement.textContent = '0';
        scoreElement.textContent = score;
        scoreContainer.classList.remove('hidden');
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    });

    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        scoreContainer.classList.add('hidden');
        questionElement.classList.remove('hidden');
        answersElement.classList.remove('hidden');
        showQuestion();
    });

    // Inicializa el juego
    showQuestion();
});

