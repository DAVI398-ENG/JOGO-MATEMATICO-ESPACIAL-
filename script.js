// Dados das perguntas - 10 questões matemáticas temáticas espaciais para 6º ano
const questions = [
    {
        question: "Um astronauta coletou 18 rochas lunares no primeiro dia e 27 no segundo. Quantas rochas ele coletou no total?",
        options: ["40", "45", "35", "50"],
        correct: 1,
        explanation: "18 + 27 = 45. Soma simples de números naturais."
    },
    {
        question: "Uma nave espacial tinha 80 litros de combustível e gastou 35 litros na viagem. Quantos litros restaram?",
        options: ["45", "50", "40", "55"],
        correct: 0,
        explanation: "80 - 35 = 45. Subtração de números naturais."
    },
    {
        question: "Cada planeta do sistema tem em média 7 luas. Quantas luas há em 6 planetas?",
        options: ["42", "36", "49", "56"],
        correct: 0,
        explanation: "6 × 7 = 42. Multiplicação."
    },
    {
        question: "Uma missão espacial dura 120 dias e é dividida em 4 equipes iguais. Quantos dias cada equipe fica?",
        options: ["30", "40", "20", "25"],
        correct: 0,
        explanation: "120 ÷ 4 = 30. Divisão exata."
    },
    {
        question: "Um astronauta comeu 1/2 de uma barra de cereal espacial e depois mais 1/4. Qual fração da barra ele comeu no total?",
        options: ["3/4", "1/2", "2/4", "1/4"],
        correct: 0,
        explanation: "1/2 = 2/4. Então 2/4 + 1/4 = 3/4."
    },
    {
        question: "A distância até Marte é 3,8 unidades e até Vênus é 2,4. Qual a soma das distâncias?",
        options: ["6,2", "5,2", "6,0", "7,2"],
        correct: 0,
        explanation: "3,8 + 2,4 = 6,2. Adição de números decimais."
    },
    {
        question: "A estação espacial completa uma órbita a cada 5 horas. Quantas órbitas ela faz em 40 horas?",
        options: ["8", "6", "10", "7"],
        correct: 0,
        explanation: "40 ÷ 5 = 8. 40 é múltiplo de 5."
    },
    {
        question: "Qual figura geométrica tem todos os lados iguais e 4 ângulos retos? (como a base de uma nave)",
        options: ["Quadrado", "Triângulo", "Círculo", "Retângulo"],
        correct: 0,
        explanation: "O quadrado tem 4 lados iguais e 4 ângulos de 90°."
    },
    {
        question: "Uma rocha espacial pesa 3,2 kg e outra 1,8 kg. Qual a massa total?",
        options: ["5 kg", "4,5 kg", "5,5 kg", "4 kg"],
        correct: 0,
        explanation: "3,2 + 1,8 = 5,0 kg. Medida de massa."
    },
    {
        question: "Resolva a expressão numérica respeitando a ordem das operações: 5 + 3 × 4",
        options: ["17", "32", "12", "20"],
        correct: 0,
        explanation: "Primeiro multiplica: 3 × 4 = 12. Depois soma: 5 + 12 = 17."
    }
];

// Estado do jogo
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const reviewScreen = document.getElementById('review-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const reviewBtn = document.getElementById('review-btn');
const restartBtn = document.getElementById('restart-btn');
const backToResults = document.getElementById('back-to-results');
const restartFromReview = document.getElementById('restart-from-review');

const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const feedback = document.getElementById('feedback');
const progressBar = document.getElementById('progress-bar');
const finalScore = document.getElementById('final-score');
const correctCount = document.getElementById('correct-count');
const reviewList = document.getElementById('review-list');

// Funções de controle de telas
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Iniciar o jogo
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
restartFromReview.addEventListener('click', startGame);

function startGame() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    showScreen(quizScreen);
    loadQuestion();
}

// Carregar pergunta atual
function loadQuestion() {
    const q = questions[currentQuestion];
    
    questionNumber.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    questionText.textContent = q.question;
    
    // Atualizar barra de progresso
    const progress = ((currentQuestion) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Limpar opções e feedback
    optionsContainer.innerHTML = '';
    feedback.classList.add('hidden');
    feedback.className = 'feedback hidden';
    nextBtn.classList.add('hidden');
    
    // Criar botões de opções
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(btn);
    });
}

// Selecionar resposta
function selectAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const isCorrect = selectedIndex === q.correct;
    
    // Registrar resposta do usuário
    userAnswers.push({
        question: q.question,
        selected: q.options[selectedIndex],
        correct: q.options[q.correct],
        isCorrect: isCorrect,
        explanation: q.explanation
    });
    
    if (isCorrect) {
        score += 10;
    }
    
    // Destacar respostas
    const optionBtns = optionsContainer.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Mostrar feedback
    feedback.classList.remove('hidden');
    if (isCorrect) {
        feedback.classList.add('correct');
        feedback.innerHTML = `✅ Correto! +10 pontos<br><small>${q.explanation}</small>`;
    } else {
        feedback.classList.add('incorrect');
        feedback.innerHTML = `❌ Incorreto. A resposta certa é: <strong>${q.options[q.correct]}</strong><br><small>${q.explanation}</small>`;
    }
    
    nextBtn.classList.remove('hidden');
}

// Próxima pergunta ou resultados
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Mostrar resultados
function showResults() {
    // Completar barra de progresso
    progressBar.style.width = '100%';
    
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    finalScore.textContent = `Pontuação final: ${score} de 100 pontos`;
    correctCount.textContent = `Você acertou ${correctAnswers} de ${questions.length} perguntas!`;
    
    showScreen(resultsScreen);
}

// Revisão das respostas
reviewBtn.addEventListener('click', showReview);
backToResults.addEventListener('click', () => showScreen(resultsScreen));

function showReview() {
    reviewList.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const item = document.createElement('div');
        item.className = `review-item ${answer.isCorrect ? 'correct-answer' : 'wrong-answer'}`;
        item.innerHTML = `
            <p><strong>Pergunta ${index + 1}:</strong> ${answer.question}</p>
            <p>Sua resposta: ${answer.selected} ${answer.isCorrect ? '✅' : '❌'}</p>
            <p>Resposta correta: ${answer.correct}</p>
            <p><em>${answer.explanation}</em></p>
        `;
        reviewList.appendChild(item);
    });
    
    showScreen(reviewScreen);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    showScreen(startScreen);
});
