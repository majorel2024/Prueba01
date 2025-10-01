// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Efecto de copos de nieve
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeSymbols = ['❅', '❆', '❄'];
    
    // Crear más copos de nieve
    for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        
        // Posición y animación aleatoria
        const leftPosition = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 5; // Entre 5 y 10 segundos
        const animationDelay = Math.random() * 5;
        const fontSize = Math.random() * 1 + 1; // Entre 1rem y 2rem
        
        snowflake.style.left = `${leftPosition}vw`;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationDelay = `${animationDelay}s`;
        snowflake.style.fontSize = `${fontSize}rem`;
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// Lista de regalos
const giftInput = document.getElementById('gift-input');
const addGiftButton = document.getElementById('add-gift');
const giftList = document.getElementById('gift-list');
const santaText = document.getElementById('santa-text');

let gifts = JSON.parse(localStorage.getItem('christmasGifts')) || [];

// Función para renderizar la lista de regalos
function renderGifts() {
    giftList.innerHTML = '';
    
    if (gifts.length === 0) {
        santaText.textContent = '¡Santa está revisando su lista! 🎅';
    } else {
        santaText.textContent = `¡Santa tiene ${gifts.length} regalo${gifts.length > 1 ? 's' : ''} en tu lista! 🎅`;
        
        gifts.forEach((gift, index) => {
            const giftItem = document.createElement('li');
            giftItem.classList.add('gift-item');
            giftItem.innerHTML = `
                <span>${gift}</span>
                <button class="delete-gift" data-index="${index}">Eliminar</button>
            `;
            giftList.appendChild(giftItem);
        });
        
        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.delete-gift').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteGift(index);
            });
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('christmasGifts', JSON.stringify(gifts));
}

// Función para agregar un regalo
function addGift() {
    const giftText = giftInput.value.trim();
    
    if (giftText !== '') {
        gifts.push(giftText);
        giftInput.value = '';
        renderGifts();
        
        // Efecto de confeti al agregar un regalo
        createConfetti();
    }
}

// Función para eliminar un regalo
function deleteGift(index) {
    gifts.splice(index, 1);
    renderGifts();
}

// Efecto de confeti
function createConfetti() {
    const colors = ['#c41e3a', '#165b33', '#bb9c4c', '#ffffff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const leftPosition = Math.random() * 100;
        
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${leftPosition}vw`;
        confetti.style.position = 'fixed';
        confetti.style.top = '0';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fallConfetti ${Math.random() * 3 + 2}s linear forwards`;
        
        // Eliminar el confeti después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Animación para el confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes fallConfetti {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto para el botón CTA
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    // Desplazarse a la sección de tradiciones
    document.querySelector('#tradiciones').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Efecto de confeti
    createConfetti();
});

// Event listeners
addGiftButton.addEventListener('click', addGift);
giftInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addGift();
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    renderGifts();
    
    // Efecto de escritura para el título
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar efecto de escritura después de un breve retraso
    setTimeout(typeWriter, 500);
});

// Contador hasta Navidad
function updateChristmasCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25); // 25 de diciembre
    
    // Si ya pasó la Navidad de este año, calcular para el próximo año
    if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25);
    }
    
    const diffTime = christmas - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Actualizar el subtítulo del héroe si existe
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && diffDays > 0) {
        heroSubtitle.textContent = `Solo faltan ${diffDays} días para Navidad. ¡Prepárate para la magia!`;
    }
}

// Actualizar el contador al cargar la página
updateChristmasCountdown();
