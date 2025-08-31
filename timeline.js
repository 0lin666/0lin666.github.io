document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.getElementById('tooltip');
    const circles = document.querySelectorAll('.timeline-circle');

    circles.forEach(circle => {
        circle.addEventListener('mouseenter', (e) => {
            tooltip.innerHTML = circle.dataset.info;
            tooltip.style.display = 'block';
            
            const rect = circle.getBoundingClientRect();
            tooltip.style.left = (rect.right + 10 + window.scrollX) + 'px';
            tooltip.style.top = (rect.top + rect.height / 2 + window.scrollY - tooltip.offsetHeight / 2) + 'px';
        });

        circle.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
});
