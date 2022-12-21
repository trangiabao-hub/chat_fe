function func1(func) {
  // request BE mất 20s
  setTimeout(() => {
    // bất đồng bộ
    console.log("function 1 run done");
    func();
  }, 5000);
}

function func2() {
  console.log("function 2 run");
}

func1(func2); // đợi 20s -> bất đồng bộ
