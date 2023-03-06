function handleSignUp(token) {
  console.log(token.credential);

  // Đẩy token xuống BE
  // nhờ axios tạo 1 cái request xuống BE

  const url = "http://localhost:6969/register-gg";
  const data = {
    id: token.credential,
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
