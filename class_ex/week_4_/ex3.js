const input = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const emptyMsg = document.querySelector('#empty-msg');

function updateEmptyMsg() {
  emptyMsg.style.display = todoList.children.length === 0 ? 'block' : 'none';
}

updateEmptyMsg();

function addTask() {
  const text = input.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `
    <span>${text}</span>
    <button class="del-btn">Delete</button>
  `;

  todoList.appendChild(li);
  input.value = '';
  updateEmptyMsg();
}

addBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('del-btn')) {
    e.target.closest('li').remove();
    updateEmptyMsg();
  }
});