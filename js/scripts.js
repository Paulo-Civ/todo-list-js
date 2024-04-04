// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

// Funções
const saveTodo = (text) => {
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

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

    console.log(todo);
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");

    if(targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done");
    }

    if(targetElement.classList.contains("remove-todo")) {
        parentElement.remove();
    }
})