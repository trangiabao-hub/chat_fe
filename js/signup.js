function signUp() {
  const email = document.getElementById("txtEmail").value;
  const fullname = document.getElementById("txtFullName").value;
  const password = document.getElementById("txtPassword").value;
  const username = document.getElementById("txtUsername").value;
  const picture =
    "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face.png";

  const url = "http://localhost:6070/sign-up";
  const data = {
    email, // email : email
    fullname,
    picture,
    username,
    password,
  };

  axios
    .post(url, data)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
