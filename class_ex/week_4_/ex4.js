const searchInput = document.querySelector('#search');
const students = document.querySelectorAll('.student');
const noResults = document.querySelector('#no-results');

searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  let visibleCount = 0;

  students.forEach((student) => {
    const name = student.getAttribute('data-name');
    const lowerName = name.toLowerCase();

    if (lowerName.includes(term)) {
      student.style.display = '';
      visibleCount++;
      
      // BONUS: Highlight matched text
      if (term !== '') {
        const index = lowerName.indexOf(term);
        const originalText = name;
        const matchedPart = originalText.substring(index, index + term.length);
        const highlighted = originalText.replace(
          new RegExp(term, 'gi'),
          (match) => `<mark>${match}</mark>`
        );
        student.innerHTML = `${highlighted} — ${student.textContent.split(' — ')[1]}`;
      } else {
        student.innerHTML = `${name} — ${student.textContent.split(' — ')[1]}`;
      }
    } else {
      student.style.display = 'none';
    }
  });

  if (visibleCount === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }
});