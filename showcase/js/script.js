document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Reveal sections as they enter the viewport.
  const revealItems = document.querySelectorAll(
    ".section-heading, .arch-card, .feature-card, .security-panel, .about-card"
  );

  revealItems.forEach((item) => item.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Animate the overview counters.
  const counters = document.querySelectorAll("[data-count]");

  const countUp = (element) => {
    const target = Number(element.dataset.count);
    const duration = 900;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.floor(target * progress);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(countUp);
  }

  // Copy the demonstration commands.
  const copyButton = document.getElementById("copy-command");
  const commandBlock = document.getElementById("terminal-command");

  if (copyButton && commandBlock) {
    copyButton.addEventListener("click", async () => {
      const originalText = copyButton.textContent;

      try {
        await navigator.clipboard.writeText(commandBlock.innerText);
        copyButton.textContent = "Copied!";
      } catch {
        copyButton.textContent = "Copy unavailable";
      }

      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 1800);
    });
  }
});
