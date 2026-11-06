const button = document.querySelector('#clicker');
const countDisplay = document.querySelector('#count');
const messageDisplay = document.querySelector('#message');

if (button && countDisplay && messageDisplay) {
  let count = 0;

  button.addEventListener('click', () => {
    count += 1;
    countDisplay.textContent = String(count);

    if (count >= 5) {
      button.classList.add('done');
      messageDisplay.textContent = 'Congratulations! You reached 5 clicks!';
    }
  });
}