document.addEventListener("DOMContentLoaded", () => {
    // ----------------- ProjectCard 类 -----------------
    class ProjectCard {
        constructor(name, description, language, url) {
            this.name = name;
            this.description = description || "暂无描述";
            this.language = language || "未知语言";
            this.url = url;
        }

        render() {
            const card = document.createElement("article");
            card.className = "project-card";
            card.dataset.language = this.language; // 用于筛选

            card.innerHTML = `
                <h3><a href="${this.url}" target="_blank">${this.name}</a></h3>
                <p>${this.description}</p>
                <span class="language ${this.language.toLowerCase()}">${this.language}</span>
            `;
            return card;
        }
    }

    // ----------------- 容器 -----------------
    const container = document.getElementById("project-cards-container");
    const filtersContainer = document.getElementById("language-filters");

    // ----------------- GitHub API -----------------
    const githubUsername = "0lin666";
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos`;

    async function fetchProjects() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("网络错误或 GitHub API 限制");

            const repos = await response.json();
            container.innerHTML = "";

            // 创建 ProjectCard 实例
            const projectCards = repos.map(repo => new ProjectCard(
                repo.name,
                repo.description,
                repo.language,
                repo.html_url
            ));

            // 渲染所有卡片
            projectCards.forEach(card => container.appendChild(card.render()));

            // 提取唯一语言
            const languages = ["全部"].concat(
                [...new Set(repos.map(r => r.language).filter(Boolean))]
            );

            // 生成筛选按钮
            filtersContainer.innerHTML = "";
            languages.forEach(lang => {
                const btn = document.createElement("button");
                btn.textContent = lang;
                if (lang === "全部") btn.classList.add("active");
                filtersContainer.appendChild(btn);
            });

            // ----------------- 事件委托：筛选项目 -----------------
            filtersContainer.addEventListener("click", e => {
                if (e.target.tagName !== "BUTTON") return;
                const selected = e.target.textContent;

                // 按钮激活状态切换
                filtersContainer.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
                e.target.classList.add("active");

                // 只隐藏“我的项目”区域的卡片，不影响上方美术作品
                document.querySelectorAll("#project-cards-container .project-card").forEach(card => {
                    if (selected === "全部" || card.dataset.language === selected) {
                        card.classList.remove("hidden");
                        card.style.opacity = 0;
                        card.style.display = "block";
                        requestAnimationFrame(() => {
                            card.style.transition = "opacity 0.5s";
                            card.style.opacity = 1;
                        });
                    } else {
                        card.style.transition = "opacity 0.5s";
                        card.style.opacity = 0;
                        setTimeout(() => card.style.display = "none", 500);
                    }
                });
            });

        } catch (error) {
            console.error("获取 GitHub 仓库失败:", error);
            container.innerHTML = "<p>无法加载项目，请稍后再试。</p>";
        }
    }

    fetchProjects();
});
