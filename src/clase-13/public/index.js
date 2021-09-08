const socket = io();

socket.on("productList", (data) => {
  const template = Handlebars.compile(`
    {{#if data}}
      <div class="table-responsive container">
        <table class="table table-dark table-sm text-center">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Foto</th>
            </tr>
          </thead>
          <tbody>
              {{#each data}}
                <tr>
                  <td scope="row">{{this.title}}</td>
                  <td>{{this.price}}</td>
                  <td>
                    <img src={{this.thumbnail}} width="50rem">
                  </td>
                </tr>
              {{/each}}
          </tbody>
        </table>
      </div>
    {{else}}
      <div class="alert alert-danger container" role="alert">
        No hay productos!
      </div>
    {{/if}}
  `);
  document.getElementById("table").innerHTML = template({ data });
});

const formIsValid = () => {
  const emailUser = document.getElementById("email-user").value;
  const message = document.getElementById("message").value;
  return emailUser.trim() !== "" && message.trim() !== ""
};

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  sendMessage()
})

const sendMessage = () => {
  if (!formIsValid()) {
    alert("Email y/o mensaje requerido");
    return;
  }
  socket.emit("new-message", { 
    emailUser: document.getElementById("email-user").value,
    message: document.getElementById("message").value
  });
  return false;
};

socket.on("messageList", (data) => {
  document.getElementById("msg-core").innerHTML = data
    .map(({emailUser, message}) => `
      <div>
        <strong style="color: blue;">${emailUser}</strong>
        <em>${message}</em>
      </div>`
    )
    .join(" ");
  clearInputs();
});

const clearInputs = () => {
  document.getElementById("email-user").value = "";
  document.getElementById("message").value = "";
};