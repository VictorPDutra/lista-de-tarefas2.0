const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.querySelector("#enter").addEventListener("click", (e) => {
  e.preventDefault();
  const item = document.querySelector("#item")
  
  if (!item.value) {
    document.querySelector("#input-error").style.display = "block";
    document.querySelector("#item").style.border = "2px solid #ff0000";
  } else {
    document.querySelector("#input-error").style.display = "none";
    document.querySelector("#item").style.border = "none";

    createItem(item)
  }

})

function displayDate() {
  date = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  date = date.toLocaleDateString('pt-BR', options)
  document.querySelector("#date").innerHTML = date
}

function displayItems() {
  let items = ""
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item">
                <div class="input-controller">
                  <textarea disabled>${itemsArray[i]}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-trash-can deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
  }
  document.querySelector(".task-box").innerHTML = items
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => { deleteItem(i) })
  })
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      updateController[i].style.display = "block"
      inputs[i].disabled = false
    })
  })
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".input-controller textarea")
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none"
      inputs[i].disabled = true
      inputs[i].style.border = "none"
    })
  })
}

function createItem(item) {
  itemsArray.push(item.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function deleteItem(i) {
  itemsArray.splice(i, 1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function updateItem(text, i) {
  itemsArray[i] = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

window.onload = function () {
  displayDate()
  displayItems()
};