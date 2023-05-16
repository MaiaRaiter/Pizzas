
  
  function CargarPizzas() {
    console.log("Estoy en CargarPizzas");
    axios
      .get("http://localhost:3000/getall/")
      // localhost:5000/pizzas/44
      .then((result) => {
        const pizza = result.data;
        var index= 0;
  
        pizza.map((pizza, index) => {
          const {Nombre , Importe} = pizza;
  
          document.querySelector("#listado").innerHTML += `
          <div class="col-4 pt-5">
          <div class="card" style="width:18rem;">
          <div class="card-body">
          <div class="alert alert-success" role="alert">
          <center><h5 class="card-title nombre">${Nombre}</h5></center>
          <center><p >$${Importe}</p></center>
          <p class="card-text"></p>
          </div>
          </div>
          </div>
          </div>
         `;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
