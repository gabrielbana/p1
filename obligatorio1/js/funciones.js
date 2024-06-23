let preguntasDePrueba = !!preguntas ? preguntas : [];
let gestiónDeTemas = new GestiónDeTemas(preguntasDePrueba);
let gestiónDePreguntas = new GestiónDePreguntas(preguntasDePrueba);

function inicio() {
  let temas = gestiónDeTemas.getSubjects(preguntasDePrueba);
  gestiónDeTemas.initSection();
  gestiónDePreguntas.initSection();
  gestiónDePreguntas.cargarListasDeTemas(temas);
}

let formularioDeTemas = document.getElementById("formularioDeTemas");
let formularioDePreguntas = document.getElementById("formularioDePreguntas");

function addNewSubject(e) {
  e.preventDefault();
  let nombre = e.target[0].value;
  let descripción = e.target[0].value;
  let nuevoTema = gestiónDeTemas.addNewSubject(nombre, descripción);
}

function agregarNuevaPregunta(e) {
  e.preventDefault();
  let tema = e.target[0].value;
  let nivel = e.target[1].value;
  let texto = e.target[2].value;
  let respuestaCorrecta = e.target[3].value;
  let respuestasIncorrectas = e.target[4].value.split(",");
  gestiónDePreguntas.agregarNuevaPregunta(
    tema,
    nivel,
    texto,
    respuestaCorrecta,
    respuestasIncorrectas
  );
}

formularioDeTemas.addEventListener("submit", addNewSubject);
formularioDePreguntas.addEventListener("submit", agregarNuevaPregunta);

inicio();
