const toDoCalendar = TO_DO_SCREEN.querySelector(".titles__header h3");
const toDoForm = TO_DO_SCREEN.querySelector(".js-to-do-list__form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = TO_DO_SCREEN.querySelector(".js-to-do-list__list");

const TODOS_KEY = "to-dos";

let toDos = [];

// TODO: Strikethrough transition

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;

  fadeOut(li, { isAfterIn: true }); // Is always after fading in
  setTimeout(() => {
    li.remove();
  }, TRANSITION_DURATION);

  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function showToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  li.classList.add("list__to-do");

  const span = document.createElement("span");
  span.innerText = newToDo.text;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";

  deleteButton.addEventListener(CLICK_EVENT, deleteTodo);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener(CLICK_EVENT, function () {
    span.classList.toggle("checked");
  });

  li.appendChild(deleteButton);
  li.appendChild(checkbox);
  li.appendChild(span);

  toDoList.appendChild(li);
  li.classList.add(HIDDEN_CLASSNAME);
  setTimeout(() => {
    fadeIn(li, { isAfterOut: true }); // Removes "hidden" class
  }, 10);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  const toDoText = toDoInput.value;
  toDoForm.reset();

  const toDo = {
    id: Date.now(),
    text: toDoText,
  };
  toDos.push(toDo);
  showToDo(toDo);
  saveToDos();
}

function showSavedToDos() {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach((toDo) => {
      showToDo(toDo);
    });
  }
}

setTimeout(() => {
  updateCalendar(new Date(), { isToDoCalendar: true });
}, 1000);

showSavedToDos();

toDoForm.addEventListener("submit", handleToDoSubmit);
