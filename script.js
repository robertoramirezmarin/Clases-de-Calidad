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