let slideActual = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots-container');

// Crear los puntos de progreso
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.title = `Ir a la diapositiva ${index + 1}`;
    
    dot.addEventListener('click', () => saltarASlide(index));
    
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

function actualizarUI() {
    slides.forEach((slide, index) => {
        if (index === slideActual) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideActual);
    });

    prevBtn.disabled = slideActual === 0;
    nextBtn.disabled = slideActual === slides.length - 1;
}

function cambiarSlide(direccion) {
    slideActual += direccion;
    if (slideActual < 0) slideActual = 0;
    if (slideActual >= slides.length) slideActual = slides.length - 1;
    actualizarUI();
}

function saltarASlide(indice) {
    slideActual = indice;
    actualizarUI();
}

prevBtn.addEventListener('click', () => cambiarSlide(-1));
nextBtn.addEventListener('click', () => cambiarSlide(1));

// Navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && slideActual < slides.length - 1) {
        cambiarSlide(1);
    } else if (e.key === 'ArrowLeft' && slideActual > 0) {
        cambiarSlide(-1);
    }
});

// --- SOPORTE PARA GESTOS TÁCTILES (SWIPE) ---
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    
    // Calcular la diferencia de movimiento
    const diffX = Math.abs(touchendX - touchstartX);
    const diffY = Math.abs(touchendY - touchstartY);
    
    // Verificar si el movimiento fue mayormente horizontal (para no interferir con el scroll vertical)
    if (diffX > diffY && diffX > 40) {
        if (touchendX < touchstartX && slideActual < slides.length - 1) {
            // Deslizó hacia la izquierda -> Siguiente
            cambiarSlide(1);
        }
        if (touchendX > touchstartX && slideActual > 0) {
            // Deslizó hacia la derecha -> Anterior
            cambiarSlide(-1);
        }
    }
});
