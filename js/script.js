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
  if (itemExist(inputValue)) {
    return;
  }
  addNewItems(inputValue);
  inputedItems.value = "";
});
// function to check existing item
function itemExist(input) {
  const formattedInput = input
    .toLowerCase()
    .split(" ")
    .filter((word) => word.trim() !== "")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const existingItems = document.querySelectorAll(
    "#taskList .item-left span:nth-child(2)"
  );
  for (const item of existingItems) {
    if (item.textContent.trim() === formattedInput) {
      alertContainer.textContent = "Item already exists!";
      alertContainer.style.color = "orange";
      return true;
    }
  }
  return false;
}
// function to add new items
function addNewItems(input) {
  const liElem = document.createElement("li");

  const spanLeft = document.createElement("span");
  spanLeft.classList.add("item-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("item-checkbox");
  const formattedInput = input
    .toLowerCase()
    .split(" ")
    .filter((word) => word.trim() !== "")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const textSpan = document.createElement("span");
  textSpan.textContent = " " + formattedInput;
  spanLeft.append(checkbox, textSpan);

  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      textSpan.style.textDecoration = "line-through";
    } else {
      textSpan.style.textDecoration = "none";
    }
  });
  const delBtn = document.createElement("button");
  delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  delBtn.classList.add("delete-btn", "item-right");

  liElem.append(spanLeft, delBtn);
  items.append(liElem);

  delBtn.addEventListener("click", () => {
    liElem.remove();
  });
}

document.onkeydown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addItemsBtn.click();
  }
};
