// tìm tới thằng có id btnAddChat và thêm sự kiện "click"

let addButton, popUpElement;
//DOM
addButton = document.getElementById("btnAddChat");
popUpElement = document.getElementById("popUp");

// tham số 1: type
// tham số 2: hành động tương ứng
addButton.addEventListener("click", function () {
  showPopUp();
});

popUpElement.addEventListener("click", function () {
  hidePopUp();
});

function showPopUp() {
  popUpElement.style.display = "block";
}

function hidePopUp() {
  popUpElement.style.display = "none";
}
