function handleLogin(token) {
  console.log(token.credential);

  // Đẩy token xuống BE
  // nhờ axios tạo 1 cái request xuống BE

  const url = "http://localhost:6969/login-gg";
  const data = {
    id: token.credential,
  };

  axios
    .post(url, data)
    .then((response) => {
      if (response.data != null) {
        // account chuan
        localStorage.setItem("account", JSON.stringify(response.data.data));
        window.location.href = "/";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
