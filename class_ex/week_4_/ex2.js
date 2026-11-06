const card = document.querySelector('#card');
const toggleBtn = document.querySelector('#toggle-btn');

toggleBtn.addEventListener('click', () => {
  card.classList.toggle('dark');
  
  if (card.classList.contains('dark')) {
    toggleBtn.textContent = '☀️ Light Mode';
  } else {
    toggleBtn.textContent = '🌙 Dark Mode';
  }
});