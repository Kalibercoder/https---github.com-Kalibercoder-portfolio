// Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } /* else {
      entry.target.classList.remove('show');
    } */
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', function () {
  const lines = document.querySelectorAll('.pLine p');
  let delay = 700;

  lines.forEach((line, index) => {
    const text = line.textContent;
    const letters = text.split('');
    line.textContent = '';
    letters.forEach((letter, index) => {
      setTimeout(() => {
        line.textContent += letter;
      }, delay + index * 100);
    });
    delay += letters.length * 100;
  });
});
