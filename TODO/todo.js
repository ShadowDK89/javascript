const todoItems = document.querySelector("#todo-items");
const todoForm = document.querySelector("#todo-form");
const todoItem = document.querySelector("#todo-list-item");
let saveItemsArr = [];

addListItem = item => {
  /*If statement is not working 100%, serveral whitespaces
makes the if statment to jump to Else instead*/

  if (item === "" || item === undefined) {
    console.log("string is empty");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> ${item} <a href="#" class="remove">X</a><hr>`;
    saveToStorage(`${li.outerHTML}`);
    todoItems.append(li);
    todoItem.value = "";
  }
};

saveToStorage = item => {
  saveItemsArr.push(item);
  localStorage.TodoItems = JSON.stringify(saveItemsArr);
};

checkLocalStorage = () => {
  if (localStorage.TodoItems !== undefined) {
    let getItem = JSON.parse(localStorage.TodoItems);
    getItem.forEach(item => {
      todoItems.innerHTML += `${item}`;
      saveToStorage(item);
    });
  }
};
checkLocalStorage();

rewriteStorage = () => {
  let rewriteLi = document.querySelectorAll("li");
  saveItemsArr = [];
  if (rewriteLi.length >= 1) {
    rewriteLi.forEach(e => {
      localStorage.clear();
      saveToStorage(`${e.outerHTML}`);
    });
  } else {
    localStorage.clear();
  }
};

todoForm.addEventListener("submit", event => {
  event.preventDefault();
  let item = todoItem.value;
  addListItem(item);
});

todoItems.addEventListener("change", event => {
  event.preventDefault();
  let toggleRemoveClass = event.target.parentElement;
  toggleRemoveClass.classList.toggle("completed");

  let isChecked = event.target;
  if (isChecked.checked) {
    isChecked.setAttribute("checked", "checked");
  } else {
    isChecked.removeAttribute("checked", "checked");
  }
  rewriteStorage();
});

todoItems.addEventListener("click", event => {
  event.preventDefault;
  let hasRemovedClass = event.target;

  if (hasRemovedClass.classList.contains("remove")) {
    let li = event.target.parentElement;
    todoItems.removeChild(li);
  }
  rewriteStorage();
});
