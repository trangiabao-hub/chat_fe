// tìm tới thằng có id btnAddChat và thêm sự kiện "click"

const DOMAIN = "http://localhost:6969";
const END_POINT = "/web-socket";

let addButton, popUpElement, inputSearch;
//DOM
addButton = document.getElementById("btnAddChat");
popUpElement = document.getElementById("popUp");
inputSearch = document.getElementById("inputSearch");

// tham số 1: type
// tham số 2: hành động tương ứng
addButton.addEventListener("click", function () {
  showPopUp();
});

popUpElement.addEventListener("click", function () {
  hidePopUp();
});

inputSearch.addEventListener("input", (e) => {
  const value = e.target.value;
  const chatList = document.getElementById("chatList");
  const accountList = document.getElementById("accountList");
  if (value == "") {
    chatList.style.display = "block";
    accountList.style.display = "none";
  } else {
    chatList.style.display = "none";
    accountList.style.display = "block";

    axios
      .get(`http://localhost:6969/account/${value}`)
      .then((response) => {
        const data = response.data.data;
        if (data.length > 0) {
          let html = "";
          data.forEach((element) => {
            html += `          
            <div class="item">
              <img
                src="${element.picture}"
                alt=""
              />
              <div class="item__detail">
                <h4>${element.fullName}</h4>
                <span>${element.email}</span>
              </div>
            </div>`;
          });

          accountList.innerHTML = html;
        } else {
          accountList.innerHTML = "<p>No data</p>";
        }
      })
      .catch();
  }
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

const checkLogin = () => {
  const account = JSON.parse(localStorage.getItem("account"));
  if (account != null) {
    const html = `
      <img
      src="${account.picture}"
      alt=""
    />
    <span>${account.fullName}</span>
    `;

    document.getElementById("information").innerHTML = html;
  } else {
    window.location.href = "/pages/login.html";
  }
};

checkLogin();
connect();
