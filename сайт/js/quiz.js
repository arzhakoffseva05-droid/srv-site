// js/quiz.js
document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
        {
            question: "Как называлась группа Стиви Рэя Вона?",
            options: ["Texas Flood", "Double Trouble", "The Vaughan Brothers", "Fabulous Thunderbirds"],
            correct: 1
        },
        {
            question: "Какой год считается годом выхода дебютного альбома 'Texas Flood'?",
            options: ["1982", "1983", "1984", "1985"],
            correct: 1
        },
        {
            question: "Какая гитара была у SRV самой известной ('Number One')?",
            options: ["Fender Telecaster", "Gibson Les Paul", "Fender Stratocaster 1962", "Gretsch White Falcon"],
            correct: 2
        },
        {
            question: "Какой из этих треков является инструментальной балладой, посвящённой жене Стиви?",
            options: ["Pride and Joy", "Lenny", "Riviera Paradise", "Texas Flood"],
            correct: 1
        },
        {
            question: "Какую награду получил альбом 'In Step'?",
            options: ["Grammy", "MTV Award", "American Music Award", "Brit Award"],
            correct: 0
        },
        {
            question: "В каком году трагически погиб Стиви Рэй Вон?",
            options: ["1989", "1990", "1991", "1992"],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;
    let quizAnswered = false;

    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const messageEl = document.getElementById('quiz-message');
    const nextBtn = document.getElementById('quiz-next');
    const restartBtn = document.getElementById('quiz-restart');
    const scoreEl = document.getElementById('quiz-score');

    function loadQuestion() {
        selectedOption = null;
        quizAnswered = false;
        messageEl.innerHTML = '';
        nextBtn.disabled = true;
        const q = quizData[currentQuestion];
        questionEl.textContent = `${currentQuestion+1}. ${q.question}`;
        optionsEl.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const div = document.createElement('div');
            div.classList.add('quiz-option');
            div.textContent = opt;
            div.dataset.index = idx;
            div.addEventListener('click', () => selectOption(idx, div));
            optionsEl.appendChild(div);
        });
        if (currentQuestion === 0) scoreEl.innerHTML = '';
    }

    function selectOption(idx, element) {
        if (quizAnswered) return;
        document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        element.classList.add('selected');
        selectedOption = idx;
        nextBtn.disabled = false;
    }

    function checkAndNext() {
        if (selectedOption === null) return;
        const isCorrect = (selectedOption === quizData[currentQuestion].correct);
        if (isCorrect) {
            score++;
            messageEl.innerHTML = '✅ Верно! +1 балл.';
        } else {
            const correctAnswer = quizData[currentQuestion].options[quizData[currentQuestion].correct];
            messageEl.innerHTML = `❌ Неверно. Правильный ответ: "${correctAnswer}".`;
        }
        quizAnswered = true;
        nextBtn.disabled = true;

        if (currentQuestion + 1 < quizData.length) {
            currentQuestion++;
            loadQuestion();
        } else {
            finishQuiz();
        }
    }

    function finishQuiz() {
        const total = quizData.length;
        let comment = '';
        if (score === total) comment = '🎸 Вы настоящий фанат! Потрясающие знания!';
        else if (score >= total-2) comment = '👍 Очень хорошо! Вы почти эксперт.';
        else if (score >= total/2) comment = '🙂 Неплохо, но можно и подтянуть биографию SRV.';
        else comment = '😕 Похоже, стоит послушать альбомы Стиви повнимательнее.';
        scoreEl.innerHTML = `Ваш результат: ${score} из ${total}<br>${comment}`;
        questionEl.textContent = 'Викторина завершена!';
        optionsEl.innerHTML = '';
        messageEl.innerHTML = '';
        nextBtn.classList.add('hidden');
        restartBtn.classList.remove('hidden');
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        selectedOption = null;
        quizAnswered = false;
        nextBtn.classList.remove('hidden');
        restartBtn.classList.add('hidden');
        nextBtn.disabled = true;
        loadQuestion();
        scoreEl.innerHTML = '';
        messageEl.innerHTML = '';
    }

    nextBtn.addEventListener('click', checkAndNext);
    restartBtn.addEventListener('click', restartQuiz);
    loadQuestion();
});