document.addEventListener('DOMContentLoaded', function() {
    // Pobieranie elementów DOM
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
    
    let currentIndex = 0;
    let interval;
    
    // Tworzenie kropek nawigacyjnych
    function createDots() {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', function() {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Aktualizacja kropek
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Przejście do określonego slajdu
    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        currentIndex = index;
        
        // Obsługa przewijania w kółko
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        } else if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        
        slides[currentIndex].classList.add('active');
        updateDots();
    }
    
    // Przejście do następnego slajdu
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Przejście do poprzedniego slajdu
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }    
    // Zatrzymanie automatycznego przewijania
    function stopAutoSlide() {
        clearInterval(interval);
    }
    
    // Obsługa przycisków
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Obsługa klawiatury
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Zatrzymanie automatycznego przewijania przy najechaniu myszą
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Inicjalizacja
    createDots();
    startAutoSlide();
});