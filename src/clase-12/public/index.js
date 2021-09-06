const { Observable, fromEvent } = rxjs;
const socket = io();

const save = document.querySelector("#save");
fromEvent(save, "click").subscribe({
  next: (e) => {
    e.preventDefault();
    socket.emit("input", {
      id: socket.id,
      title: document.querySelector("#title").value,
      price: Number(document.querySelector("#price").value),
      thumbnail: document.querySelector("#thumbnail").value,
    });
    
  },
});

socket.on("clearFields", () => {
  document.querySelector("#title").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#thumbnail").value = "";
})

socket.on("notificacion", (data) => {
  alert(data);
})

socket.on("productList", (data) => {
  const template = Handlebars.compile(`{{> table}}`);

  document.getElementById("table").innerHTML = template({ data });
});