document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Functionality
    const header = document.getElementById('main-header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Initial check in case page is loaded halfway down
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);

    // 2. Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.querySelector('.slider-btn.prev');
    const btnNext = document.querySelector('.slider-btn.next');
    let currentSlide = 0;

    // We only have 1 slide in html right now, but let's make it work for multiple if added
    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        if (btnNext) btnNext.addEventListener('click', nextSlide);
        if (btnPrev) btnPrev.addEventListener('click', prevSlide);
    }

    // 3. Scroll Animations (Intersection Observer)
    const elementsToObserve = document.querySelectorAll('.observe-fade-right, .observe-fade-left, .observe-fade-up');

    if (elementsToObserve.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% visible
            rootMargin: '0px 0px -50px 0px'
        });

        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }
});
