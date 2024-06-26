// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const saveTodo = (text, done = 0, save = 1) => {
    // <div class="todo">
    //     <h3>Estou a fazer algo 2...</h3>
    //     <button class="finish-todo">
    //         <i class="fa-solid fa-check"></i>
    //     </button>
    //     <button class="edit-todo">
    //         <i class="fa-solid fa-pen"></i>
    //     </button>
    //     <button class="remove-todo">
    //         <i class="fa-solid fa-xmark"></i>
    //     </button>
    // </div>
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    // Utilizando dados da LocalStorage
    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({text, done});
    }

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach(element => {
        let todoTitle = element.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            updateTodoLocalStorage(oldInputValue, text);
        }
    });
};

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach(element => {
        let todoTitle = element.querySelector("h3").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

        element.style.display = "flex";

        if (!todoTitle.includes(normalizedSearch)) {
            element.style.display = "none";
        }
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
        case "all":
            todos.forEach(element => {
                element.style.display = "flex";
            });
            break;

        case "done":
            todos.forEach(element => {
                element.classList.contains("done") ? element.style.display = "flex" : element.style.display = "none";
            });
            break;

        case "todo":
            todos.forEach(element => {
                !element.classList.contains("done") ? element.style.display = "flex" : element.style.display = "none";
            });
            break;

        default:
            break;
    }
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");
    let todoTitle;

    if (parentElement && parentElement.querySelector("h3")) {
        todoTitle = parentElement.querySelector("h3").innerText;
    }

    if (targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetElement.classList.contains("remove-todo")) {
        parentElement.remove();

        removeTodoLocalStorage(todoTitle);
    }

    if (targetElement.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value

    getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
}

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach(element => {
        saveTodo(element.text, element.done, 0);
    });
}

const saveTodoLocalStorage = (todo) => {
    // todos da local storage
    const todos = getTodosLocalStorage();

    // add novo todo ao array
    todos.push(todo);

    // salvar novamente no local storage
    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter(todo => todo.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map(todo => todo.text === todoText ? (todo.done = !todo.done) : null);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map(todo => todo.text === todoOldText ? (todo.text = todoNewText) : null);

    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();