// Создание летающих лепестков
function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalSymbols = ['🌸', '🌷', '🌺', '🌼', '🌹', '💐', '🌻', '🌞'];
    
    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
        
        // Случайное начальное положение
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (15 + Math.random() * 25) + 'px';
        petal.style.animationDuration = (8 + Math.random() * 15) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        
        container.appendChild(petal);
    }
}

// Открытие модального окна
function setupModal() {
    const exploreBtn = document.getElementById('exploreBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeModal');
    
    exploreBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Переключение вкладок
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            tabBtns.forEach(b => b.classList.remove('active'));
            // Добавляем текущей кнопке
            btn.classList.add('active');
            
            // Скрываем все вкладки
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Показываем нужную вкладку
            const tabId = btn.dataset.tab;
            const activeTab = document.getElementById(tabId + 'Tab');
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

// Анимация цифр (эффект счетчика)
function animateNumbers() {
    const numberElements = document.querySelectorAll('.number');
    
    numberElements.forEach(el => {
        const target = parseInt(el.textContent);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Добавление эффекта при наведении на карточки традиций
function setupCardHover() {
    const cards = document.querySelectorAll('.tradition-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.tradition-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.tradition-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
}

// Случайное изменение цвета кнопки при наведении (пасхалка)
function setupEasterEgg() {
    const btn = document.querySelector('.explore-btn');
    
    btn.addEventListener('mousemove', (e) => {
        if (e.shiftKey && e.ctrlKey) {
            const randomHue = Math.random() * 360;
            btn.style.background = `linear-gradient(135deg, hsl(${randomHue}, 100%, 75%), hsl(${randomHue + 20}, 100%, 70%))`;
        }
    });
}

// Плавное появление элементов при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    setupModal();
    setupTabs();
    setupCardHover();
    setupEasterEgg();
    
    // Добавляем класс для анимации появления
    document.querySelector('.hero-card').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.hero-card').style.transition = 'opacity 1.5s';
        document.querySelector('.hero-card').style.opacity = '1';
    }, 200);
    
    // Анимируем числа после загрузки контента
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('active')) {
                    animateNumbers();
                }
            }
        });
    });
    
    document.querySelectorAll('.tab-content').forEach(tab => {
        observer.observe(tab, { attributes: true });
    });
});

// Добавляем эффект параллакса для лепестков
window.addEventListener('mousemove', (e) => {
    const petals = document.querySelectorAll('.petal');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    petals.forEach((petal, index) => {
        if (index % 3 === 0) {
            const speed = 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            petal.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
});

// Предотвращаем закрытие модального окна при клике на контент
document.querySelector('.modal-content')?.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Добавляем поддержку клавиши Escape для закрытия
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalOverlay');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Создаем эффект ряби на кнопке
const btn = document.querySelector('.explore-btn');
btn.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
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
