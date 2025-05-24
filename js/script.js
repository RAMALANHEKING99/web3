const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        item.classList.toggle('active');
    });
});

const slider = document.getElementById('imageSlider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dots = document.querySelectorAll('.slider-dot');

let currentSlide = 0;
const slideCount = slides.length;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

let slideInterval = setInterval(nextSlide, 5000);

slider.parentElement.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.parentElement.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});
// Hero Slider Functionality
const heroSlider = () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Show current slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }
    
    // Start auto sliding
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Pause auto sliding when hovering over slider
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseSlider();
        startSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseSlider();
        startSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            pauseSlider();
            startSlider();
        });
    });
    
    // Pause on hover
    document.querySelector('.hero-slider').addEventListener('mouseenter', pauseSlider);
    document.querySelector('.hero-slider').addEventListener('mouseleave', startSlider);
    
    // Initialize
    showSlide(currentSlide);
    startSlider();
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', heroSlider);