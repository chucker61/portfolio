export function initializeAnimations() {
    const skillGrid = document.querySelector('.skill-grid');
    const projectGrid = document.querySelector('.project-grid');

    if (skillGrid) setupAutoScroll(skillGrid);
    if (projectGrid) setupAutoScroll(projectGrid);
}

function setupAutoScroll(container) {
    let isMouseDown = false;
    let startX;
    let scrollLeft;
    let animationFrameId;
    let direction = 1;
    const speed = 1;

    function animate() {
        if (!isMouseDown) {
            // Sağa doğru kayma
            if (direction === 1) {
                container.scrollLeft += speed;
                // Sona ulaştığında yön değiştir
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    direction = -1;
                }
            }
            // Sola doğru kayma
            else {
                container.scrollLeft -= speed;
                // Başa ulaştığında yön değiştir
                if (container.scrollLeft <= 0) {
                    direction = 1;
                }
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    // Mouse olayları
    container.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        // Animasyonu durdur
        cancelAnimationFrame(animationFrameId);
    });

    container.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('mouseup', () => {
        isMouseDown = false;
        container.style.cursor = 'grab';
        // Animasyonu tekrar başlat
        animate();
    });

    container.addEventListener('mouseleave', () => {
        isMouseDown = false;
        container.style.cursor = 'grab';
        // Animasyonu tekrar başlat
        animate();
    });

    // Touch olayları
    container.addEventListener('touchstart', (e) => {
        isMouseDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        cancelAnimationFrame(animationFrameId);
    });

    container.addEventListener('touchmove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchend', () => {
        isMouseDown = false;
        animate();
    });

    // Başlangıçta animasyonu başlat
    animate();
}

export function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = section.offsetTop;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
} 