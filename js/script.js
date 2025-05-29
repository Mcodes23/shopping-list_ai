const inputedItems = document.getElementById("userInput");
const addItemsBtn = document.getElementById("addTaskBtn");
const items = document.getElementById("taskList");
const alertContainer = document.getElementById("alert-container");

inputedItems.addEventListener("input", () => {
  alertContainer.textContent = "";
});

addItemsBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const inputValue = inputedItems.value.trim();

  if (inputValue === "") {
    alertContainer.textContent = "Please add an item!";
    alertContainer.style.color = "red";
    return;
  }
  addNewItems(inputValue);
  inputedItems.value = "";
});
function addNewItems(input) {
  const liElem = document.createElement("li");

  const spanLeft = document.createElement("span");
  spanLeft.classList.add("item-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("item-checkbox");

  const textNode = document.createTextNode(
    " " + input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
  );

  spanLeft.append(checkbox, textNode);

  const delBtn = document.createElement("button");
  delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  delBtn.classList.add("delete-btn", "item-right");

  liElem.append(spanLeft, delBtn);
  items.append(liElem);

  delBtn.addEventListener("click", () => {
    liElem.remove();
  });
}
