document.addEventListener("DOMContentLoaded", () => {
  const titles = ["两大问", "想要知道什么？","期待看到什么？","哦，对了","《魂斗罗》30条命的秘籍好像有用处了"];
  const typingElement = document.getElementById("typing-title");

  let titleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typingSpeed = 150;
  const pauseTime = 1000;

  function type() {
    const current = titles[titleIndex];

    if (!deleting) {
      typingElement.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, pauseTime);
        return;
      }
    } else {
      typingElement.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
    }
    setTimeout(type, typingSpeed);
  }

  type();
});
