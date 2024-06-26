// Initial array of todos
let todos = []

// Function to load todos from local storage
function loadTodos() {
	const storedTodos = localStorage.getItem('todos')
	if (storedTodos) {
		todos = JSON.parse(storedTodos)
		render()
		updateCounters()
	}
}

// Function to save todos to local storage
function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos))
}

// Function to add a new todo
function newTodo() {
	const task = prompt('Enter a new todo:').trim()
	if (task.length !== 0) {
		todos.push({ task: task, completed: false })
		saveTodos()
		render()
		updateCounters()
	}
}

// Function to render a single todo item
function renderTodo(todo) {
	return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.task}" ${
		todo.completed ? 'checked' : ''
	} onclick="checkTodo('${todo.task}')"/>
      <label for="${todo.task}" class="${
		todo.completed ? 'text-success text-decoration-line-through' : ''
	}">${todo.task}</label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo('${
				todo.task
			}')">delete</button>
    </li>
  `
}

// Function to render all todos
function render() {
	const todoList = todos.map((todo) => renderTodo(todo)).join('')
	document.getElementById('todo-list').innerHTML = todoList
}

// Function to update counters
function updateCounters() {
	const itemCount = todos.length
	const uncheckedCount = todos.filter((todo) => !todo.completed).length
	document.getElementById('item-count').textContent = itemCount
	document.getElementById('unchecked-count').textContent = uncheckedCount
}

// Function to delete a todo item
function deleteTodo(task) {
	todos = todos.filter((todo) => todo.task !== task)
	saveTodos()
	render()
	updateCounters()
}

// Function to check/uncheck a todo item
function checkTodo(task) {
	const index = todos.findIndex((todo) => todo.task === task)
	if (index !== -1) {
		todos[index].completed = !todos[index].completed
		saveTodos()
		render()
		updateCounters()
	}
}

// Call loadTodos() when the page loads
window.onload = loadTodos
