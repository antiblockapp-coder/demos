/**
 * SOF ARENDUS - Main JavaScript
 * Vanilla JS - No frameworks
 */

// ================================
// Video Background Initialization
// ================================
const initVideoBackground = () => {
    const video = document.querySelector('.hero-video');
    if (video) {
        console.log('Видео найдено:', video);
        console.log('Источник видео:', video.querySelector('source').src);
        
        // Принудительное воспроизведение видео
        video.play().then(() => {
            console.log('Видео успешно запущено');
            video.style.opacity = '1';
        }).catch(error => {
            console.log('Автовоспроизведение заблокировано:', error);
            // Если автовоспроизведение заблокировано, показываем fallback изображение
            const img = video.querySelector('img');
            if (img) {
                console.log('Показываем fallback изображение');
                img.style.display = 'block';
                video.style.display = 'none';
            }
        });

        // Обработка событий видео
        video.addEventListener('loadstart', () => {
            console.log('Видео начало загружаться');
        });

        video.addEventListener('canplay', () => {
            console.log('Видео готово к воспроизведению');
            video.style.opacity = '1';
        });

        video.addEventListener('error', (e) => {
            console.log('Ошибка загрузки видео:', e);
            // Показываем fallback изображение
            const img = video.querySelector('img');
            if (img) {
                console.log('Показываем fallback изображение из-за ошибки');
                img.style.display = 'block';
                video.style.display = 'none';
            }
        });

        // Дополнительная проверка через 3 секунды
        setTimeout(() => {
            if (video.paused) {
                console.log('Видео все еще на паузе, показываем fallback');
                const img = video.querySelector('img');
                if (img) {
                    img.style.display = 'block';
                    video.style.display = 'none';
                }
            }
        }, 3000);
    } else {
        console.log('Видео не найдено!');
    }
};

// ================================
// Navigation Scroll Effect
// ================================
const initNavigation = () => {
    const nav = document.getElementById('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
};

// ================================
// Smooth Scroll for Anchor Links
// ================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
};

// ================================
// Intersection Observer for Fade-in Animations
// ================================
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
};

// ================================
// Contact Form Handler
// ================================
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.');
            
            // Reset form
            e.target.reset();
            
            // Here you can add AJAX call to send data to server
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
        });
    }
};

// ================================
// Initialize All
// ================================
const init = () => {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initNavigation();
            initSmoothScroll();
            initScrollAnimations();
            initContactForm();
            initVideoBackground(); // Инициализация видео фона
        });
    } else {
        // DOM is already ready
        initNavigation();
        initSmoothScroll();
        initScrollAnimations();
        initContactForm();
        initVideoBackground(); // Инициализация видео фона
    }
};

// Start the application
init();

