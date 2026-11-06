const searchInput = document.querySelector('#search');
const students = document.querySelectorAll('.student');
const noResults = document.querySelector('#no-results');

if (searchInput && noResults) {
  const studentData = Array.from(students, (student) => ({
    element: student,
    name: student.dataset.name || '',
    course: student.textContent.split(' — ').slice(1).join(' — '),
  }));

  searchInput.addEventListener('input', (event) => {
    const term = event.target.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    studentData.forEach(({ element, name, course }) => {
      const matchIndex = name.toLocaleLowerCase().indexOf(term);
      const isVisible = matchIndex !== -1;
      element.hidden = !isVisible;

      if (!isVisible) return;
      visibleCount += 1;

      if (!term) {
        element.textContent = `${name} — ${course}`;
        return;
      }

      const fragment = document.createDocumentFragment();
      fragment.append(document.createTextNode(name.slice(0, matchIndex)));

      const mark = document.createElement('mark');
      mark.textContent = name.slice(matchIndex, matchIndex + term.length);
      fragment.append(mark);
      fragment.append(document.createTextNode(name.slice(matchIndex + term.length)));
      fragment.append(document.createTextNode(` — ${course}`));
      element.replaceChildren(fragment);
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  });
}