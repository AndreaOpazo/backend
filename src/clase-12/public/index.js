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