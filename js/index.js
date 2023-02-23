// tìm tới thằng có id btnAddChat và thêm sự kiện "click"

const DOMAIN = "http://localhost:6969";
const END_POINT = "/web-socket";

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

var stomp;

const connect = () => {
  var socket = new SockJS(DOMAIN + END_POINT);
  stomp = Stomp.over(socket);

  stomp.connect({}, () => {
    stomp.subscribe("/topic/room", (response) => {
      const messages = document.getElementById("messages");
      html = `          
      <div class="message me">
        <div class="message__detail">
          <div class="message__detail__avatar">
            <img
              src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-hai-1.jpg"
              alt=""
            />
          </div>
          <div class="message__detail__text">
            <div class="info">nguyengocba, 5:17 PM</div>
            <div class="text">
              ${response.body}
            </div>
          </div>
        </div>
      </div>
    `;
      messages.innerHTML += html;
    });
  });
};

const sentMessage = () => {
  const message = document.getElementById("message").value;
  stomp.send("/app/room", {}, message);
};

connect();
