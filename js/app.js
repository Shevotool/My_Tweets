// Variables
const listaTweets = document.querySelector("#lista-tweets");
const formulario = document.querySelector("#formulario");
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
  //Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // Cuando el doci=umento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    console.log(tweets);

    crearHTML();
  });
}

// Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  // leer el valor del textarea
  const tweet = document.querySelector("#tweet").value;

  // validación
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");
    return; // Evita que se ejecuten mas lineas de codigo
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];

  // Una vez agregado vamos a crear el HTML
  crearHTML();

  // Reiniciar el formulario
  formulario.reset();
}

function mostrarError(error) {
  const mensajeEerror = document.createElement("p");
  mensajeEerror.textContent = error;
  mensajeEerror.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeEerror);

  setTimeout(() => {
    mensajeEerror.remove();
  }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // Crear un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      // Añadir la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // Crear el HTML
      const li = document.createElement("li");

      // Add el texto
      li.innerText = tweet.tweet;

      // Asignar el boton
      li.appendChild(btnEliminar);

      // Insertarlo en el HTML
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agrega los tweets actuales a localstorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Eliminar un tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  console.log(tweets);

  crearHTML();
}
// Limpiar el html
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
