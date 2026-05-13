// js/main.js
// Файл для общих скриптов (например, для активного пункта меню)
document.addEventListener('DOMContentLoaded', function() {
    // Подсветка активной ссылки в меню (по текущему пути)
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.style.backgroundColor = '#d4a373';
            link.style.color = '#0a0a1a';
        } else if (currentPath === '/' && linkPath === '/') {
            link.style.backgroundColor = '#d4a373';
            link.style.color = '#0a0a1a';
        }
    });
});