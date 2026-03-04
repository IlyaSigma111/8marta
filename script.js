// Создание летающих лепестков
function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalSymbols = ['🌸', '🌷', '🌺', '🌼', '🌹', '💐', '🌻'];
    
    for (let i = 0; i < 40; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (15 + Math.random() * 30) + 'px';
        petal.style.animationDuration = (8 + Math.random() * 20) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(petal);
    }
}

// Навигация
function setupNavigation() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('slideCounter');
    const progress = document.getElementById('progressFill');
    const dotsContainer = document.getElementById('dotsContainer');
    
    let current = 0;
    const total = slides.length;
    counter.textContent = `1/${total}`;

    // Создание точек
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (index < 0 || index >= total) return;
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        current = index;
        counter.textContent = (index + 1) + '/' + total;
        progress.style.width = ((index + 1) / total * 100) + '%';
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === total - 1;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    prevBtn.addEventListener('click', () => goToSlide(current - 1));
    nextBtn.addEventListener('click', () => goToSlide(current + 1));
    
    return { goToSlide, current };
}

// Режим презентации
function setupPresentationMode() {
    const modeBtn = document.getElementById('presentationModeBtn');
    const panel = document.getElementById('glassPanel');
    
    modeBtn.addEventListener('click', () => {
        panel.classList.toggle('presentation-mode');
        modeBtn.innerHTML = panel.classList.contains('presentation-mode') ? 
            '🌷 ВЫЙТИ' : '🌸 ПОЛНЫЙ ЭКРАН';
    });
}

// Интерактив с цветами
function setupFlowers() {
    const flowerItems = document.querySelectorAll('.flower-item');
    const flowerFact = document.getElementById('flowerFact');
    
    const facts = {
        tulip: '🌷 Тюльпаны появились в Голландии в XVI веке и стоили целое состояние!',
        mimosa: '🌼 Мимоза стала символом 8 марта в Италии с 1946 года.',
        rose: '🌹 Самая древняя роза найдена в ископаемых возрастом 35 млн лет.',
        lily: '🌸 Лилии упоминаются в древнегреческих мифах как цветок Геры.'
    };
    
    flowerItems.forEach(item => {
        item.addEventListener('click', () => {
            const flower = item.dataset.flower;
            if (flower && facts[flower]) {
                flowerFact.textContent = facts[flower];
                flowerFact.style.animation = 'none';
                flowerFact.offsetHeight;
                flowerFact.style.animation = 'fadeIn 0.5s';
            }
        });
    });
}

// Комплименты
function setupCompliments() {
    const input = document.getElementById('complimentInput');
    const btn = document.getElementById('checkComplimentBtn');
    const fill = document.getElementById('moodFill');
    const text = document.getElementById('moodText');
    const examples = document.querySelectorAll('.example');
    
    btn.addEventListener('click', () => {
        const compliment = input.value;
        let score = 30;
        
        if (compliment.length > 20) {
            score = 100;
            text.textContent = '💖 Вау! Настроение на 100% выше!';
        } else if (compliment.length > 10) {
            score = 70;
            text.textContent = '💕 Отлично! Настроение поднялось!';
        } else if (compliment.length > 3) {
            score = 50;
            text.textContent = '🌸 Хорошо, но можно теплее!';
        } else {
            text.textContent = '🌷 Напиши что-нибудь приятное!';
        }
        
        fill.style.width = score + '%';
    });
    
    examples.forEach(example => {
        example.addEventListener('click', () => {
            input.value = example.dataset.compliment;
            btn.click();
        });
    });
}

// Викторина
function setupQuiz() {
    const questions = [
        {
            question: 'Кто предложил учредить Международный женский день?',
            options: ['Клара Цеткин', 'Роза Люксембург', 'Надежда Крупская', 'Александра Коллонтай'],
            correct: 0
        },
        {
            question: 'В каком году 8 марта стало выходным в СССР?',
            options: ['1917', '1945', '1966', '1975'],
            correct: 2
        },
        {
            question: 'Какой цветок стал символом 8 марта в Италии?',
            options: ['Тюльпан', 'Мимоза', 'Роза', 'Ландыш'],
            correct: 1
        },
        {
            question: 'В каком году ООН признала праздник международным?',
            options: ['1966', '1975', '1980', '1991'],
            correct: 1
        }
    ];
    
    let currentQuestion = 0;
    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.querySelectorAll('.quiz-option');
    const feedbackEl = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('nextQuizBtn');
    
    function loadQuestion() {
        const q = questions[currentQuestion];
        questionEl.textContent = q.question;
        optionsEl.forEach((btn, index) => {
            btn.textContent = q.options[index];
            btn.classList.remove('correct', 'wrong');
            btn.disabled = false;
        });
        feedbackEl.classList.add('hidden');
        nextBtn.classList.add('hidden');
    }
    
    optionsEl.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const q = questions[currentQuestion];
            const isCorrect = index === q.correct;
            
            btn.classList.add(isCorrect ? 'correct' : 'wrong');
            optionsEl.forEach(b => b.disabled = true);
            
            feedbackEl.textContent = isCorrect ? 
                '✅ Правильно!' : `❌ Неверно. Правильный ответ: ${q.options[q.correct]}`;
            feedbackEl.classList.remove('hidden');
            feedbackEl.classList.add(isCorrect ? 'correct' : 'wrong');
            
            nextBtn.classList.remove('hidden');
        });
    });
    
    nextBtn.addEventListener('click', () => {
        currentQuestion = (currentQuestion + 1) % questions.length;
        loadQuestion();
    });
    
    loadQuestion();
}

// Открытка-слайдер
function setupCardSlider() {
    const slider = document.getElementById('cardSlider');
    if (!slider) return;
    
    const percent = document.getElementById('cardPercent');
    const line2 = document.getElementById('cardLine2');
    const line3 = document.getElementById('cardLine3');
    
    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        percent.textContent = val + '%';
        line2.classList.toggle('visible', val >= 33);
        line3.classList.toggle('visible', val >= 66);
    });
}

// Параллакс для лепестков
function setupParallax() {
    window.addEventListener('mousemove', (e) => {
        const petals = document.querySelectorAll('.petal');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        petals.forEach((petal, index) => {
            if (index % 4 === 0) {
                const speed = 15;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                petal.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    });
}

// Анимация появления
function setupEntranceAnimation() {
    const heroCard = document.querySelector('.slide.active .slide-main-title');
    if (heroCard) {
        heroCard.style.opacity = '0';
        setTimeout(() => {
            heroCard.style.transition = 'opacity 1.5s';
            heroCard.style.opacity = '1';
        }, 200);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    const nav = setupNavigation();
    setupPresentationMode();
    setupFlowers();
    setupCompliments();
    setupQuiz();
    setupCardSlider();
    setupParallax();
    setupEntranceAnimation();
    
    // Добавляем эффект ряби на кнопки
    document.querySelectorAll('.nav-btn, .quiz-option, .explore-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            
            const rect = btn.getBoundingClientRect();
            ripple.style.left = e.clientX - rect.left + 'px';
            ripple.style.top = e.clientY - rect.top + 'px';
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            
            const animation = ripple.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(20)', opacity: 0 }
            ], {
                duration: 500,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => ripple.remove();
        });
    });
});

// Клавиши навигации
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        document.getElementById('nextBtn')?.click();
    } else if (e.key === 'ArrowLeft') {
        document.getElementById('prevBtn')?.click();
    }
});
