document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('#theme-toggle');

    // 页面加载时，读取本地存储的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        toggleBtn.textContent = '🌙';
    } else {
        toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');

        // 更新按钮图标
        const isDark = document.body.classList.contains('dark');
        toggleBtn.textContent = isDark ? '🌙' : '☀️';

        // 保存用户选择到 localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});
