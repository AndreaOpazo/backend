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