document.addEventListener("DOMContentLoaded", () => {
    const skillArticles = document.querySelectorAll("article.info-card");

    skillArticles.forEach(article => {
        const skillBars = article.querySelectorAll(".skill-progress");
        if (skillBars.length === 0) return;

        let animated = false;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    skillBars.forEach(bar => {
                        // 条形动画
                        bar.style.width = bar.dataset.percent;
                        bar.style.transition = "width 1.5s ease-in-out";

                        // 判断类型：爱好分数显示整数，职业比例显示百分比
                        const parentHeading = article.querySelector("h2").textContent;
                        const value = parseInt(bar.dataset.percent); // 数值部分
                        let labelText = parentHeading.includes("爱好") ? value : value + "%";

                        // 创建显示元素
                        const span = document.createElement("span");
                        span.className = "skill-label";
                        span.textContent = labelText;
                        span.style.marginLeft = "10px";
                        span.style.fontWeight = "bold";

                        // 添加到技能条容器末尾
                        bar.parentNode.parentNode.appendChild(span);
                    });
                    animated = true;
                }
            });
        }, { threshold: 1 });

        observer.observe(article);
    });
});
