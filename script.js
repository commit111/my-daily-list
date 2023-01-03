//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
todoInput.addEventListener("click", clearField);

//Functions
function addTodo(event) {
  //Prevent form from submitting after click
  event.preventDefault();

  //console.log("hello");

  //Checks value length before creating todo
  /*
  if (todoInput.value.length < 1) {
    alert("Please type in something.");
  } else {put create li in here}
  */

  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create LI
  const newTodo = document.createElement("li");
  newTodo.textContent = todoInput.value; //was .innerText instead of .textContent, but it's bad practice
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); //sticks it inside the div

  //for local storage: ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'; //makes i html element in the btn
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //APPEND TO LIST
  todoList.appendChild(todoDiv);

  //CLEAR TODO INPUT VALUE
  todoInput.value = "";
}

function deleteCheck(e) {
  //console.log(e.target);
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animate the fall
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //CHECK MARK TODO
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  //since we use nodes, we can use a for-each loop on the todos

  todos.forEach(function (todo) {
    const mStyle = todo.style;
    if (mStyle != undefined && mStyle != null) {
      switch (e.target.value) {
        case "all":
          mStyle.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            mStyle.display = "flex";
            break;
          } else {
            mStyle.display = "none";
          }
          break;
        case "uncompleted":
          if (todo.classList.contains("completed")) {
            mStyle.display = "none";
          } else {
            mStyle.display = "flex";
          }
          break;
      }
    }
  });
}

function clearField(e) {
  todoInput.value = "";
  todoInput.style.color = "rgba(60, 60, 60)";
  todoInput.style.fontStyle = "normal";
}

// local storage begins below here

function saveLocalTodos(todo) {
  //CHECK --- do I already have things in here?
  
  //TO CLEAR LOCAL STORAGE
  //localStorage.clear(); 
  
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // COPIED FROM THE addTodo function...
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.textContent = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); //sticks it inside the div

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'; //makes i html element in the btn
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  console.log(todo.children[0].textContent);
  console.log(todos.indexOf('eat'))
  //const todoIndex = todo;
}
