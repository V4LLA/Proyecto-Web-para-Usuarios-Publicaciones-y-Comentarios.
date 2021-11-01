const btnAdd = document.getElementById("btnLoad");
  btnAdd.addEventListener("click",()=>{
   fetch('https://jsonplaceholder.typicode.com/users')
   .then(response => response.json())
   .then(json => {
   let info = "";
   for (let i=0;i<json.length;i++){
     info += `<option value = '${json[i].id}'> ${json[i].name} </option>`
   }
   const datos = document.getElementById("users")
   datos.innerHTML=info;
  });
});

const btnDatos = document.getElementById("btnVerD");
  btnDatos.addEventListener("click",()=>{
    const divdatosautor = document.getElementById("datos");
    let id = document.getElementById("users").value;
    fetch('https://jsonplaceholder.typicode.com/users/'+id)
    .then((response) => response.json())
    .then((json) => {
      let datos = '';
        datos = `<div id="datosUser">
        <h3>Username: ${json.username}</h3> 
        <p>Address: ${json.address.city}</p>
        <p>Email: ${json.email}</p>
        <p>Phone: ${json.phone}</p>
        <p>Company: ${json.company.name}</p>
        <p>Website: ${json.website}</p>
          <button type="button" class='btnQuit' onclick="eliminarDatos()">Eliminar</button>
      </div>`;
    divdatosautor.innerHTML = datos;
  });
});

function eliminarDatos (){
  let quitar = document.getElementById("datos");
  quitar.innerHTML = "";
};



const menuUser = document.getElementById("users");
  menuUser.addEventListener("change",()=>{
  const divdatos = document.getElementById("posts") 
  let id = document.getElementById("users").value
  fetch('https://jsonplaceholder.typicode.com/posts?userId='+ id)
  .then((response) => response.json())
  .then((json) => {
    let datos = '';
    for (let i=0;i<json.length;i++){
      let a=i+1;
      datos += `<div>
        <h3 id="tituloPostEA">${json[i].title}</h3>
        <p id="body">${json[i].body}</p>
        <button type="button" onclick="cargarComments(${json[i].id})" >Ver Comentarios</button>
        <div id="comment${json[i].id}">
        </div> 
      </div>`
    }
    divdatos.innerHTML = datos;
  });
});

function cargarComments(postid){
  // console.log(" clicked " , postid)
  let comments = document.getElementById("comment" + postid);
  fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postid )
       .then((response) => response.json())
       .then((json)=> {
         let comentario = "<button type='button' class='btnQuit' onclick='eliminarComments("+ postid +")'>Quitar</button>";
         for (let i=0; i<json.length;i++){
           let a=i+1;
           comentario += `<div class="comentarios" > <hr>
             <h3 class="colortituloscomentarios">Comentario Núm: ${a}</h3>
             <h3> Nombre:  ${json[i].name} </h3> 
             <h4> Email:  ${json[i].email} </h4>
             <p class="colorcomentarios"> Body:  ${json[i].body} </p>
          </div>`
       } 
       comments.innerHTML = comentario;
     });
};


function eliminarComments (postid){
  let quitar = document.getElementById("comment" +postid);
  quitar.innerHTML = "";
};
