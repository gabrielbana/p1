class GestiónDeTemas {
  constructor(preguntas) {
    this.listOfSubjects = document.getElementById("listaDeTemas");
    this.amountOfSubjects = document.getElementById("cantidadDeTemas");
    this.listOfSubjectsWithoutQuestions = document.getElementById(
      "listaDeTemasSinPregunta"
    );
    this.questionsAverage = document.getElementById("promedioDePreguntas");
    this.temas = [];
    this.preguntas = !!preguntas ? preguntas : [];
  }

  initSection() {
    if (this.preguntas <= 0) {
      this.amountOfSubjects.textContent = "0";
      let emptyListNode = document.createElement("li");
      let textEmptyList = document.createTextNode("Sin datos");
      emptyListNode.appendChild(textEmptyList);
      this.listOfSubjects.appendChild(emptyListNode);
      this.listOfSubjectsWithoutQuestions.appendChild(emptyListNode);
      this.questionsAverage.innerText = "sin datos";
    }
    if (this.preguntas.length > 0) {
      this.preguntas.forEach(({ tema }) => {
        gestiónDeTemas.addNewSubject(tema.nombre, tema.descripcion);
      });
      this.amountOfSubjects.textContent = this.getSubjectsAmount();
    }
  }

  getSubjects() {
    return this.temas;
  }

  getSubject(temaDePregunta) {
    return this.temas.find((tema) => tema.nombre === temaDePregunta);
  }

  getSubjectsAmount() {
    return this.temas.length;
  }

  getSubjectsWithoutQuestions(preguntas) {
    let temasSinPreguntas = [];
    this.temas.forEach((tema) => {
      let temaConPregunta = preguntas.find((pregunta) => {
        return pregunta.tema.nombre === tema.nombre;
      });

      if (!!temaConPregunta) return;
      temasSinPreguntas.push(tema.nombre);
    });
    return temasSinPreguntas;
  }

  updateSection() {
    let temasSinPreguntas = this.getSubjectsWithoutQuestions(this.preguntas);
    while (this.listOfSubjects.firstChild) {
      this.listOfSubjects.removeChild(this.listOfSubjects.lastChild);
    }
    while (this.listOfSubjectsWithoutQuestions.firstChild) {
      this.listOfSubjectsWithoutQuestions.removeChild(
        this.listOfSubjectsWithoutQuestions.lastChild
      );
    }
    if (temasSinPreguntas.length !== 0) {
      temasSinPreguntas.forEach((tema) => {
        let emptyListNode = document.createElement("li");
        let textEmptyList = document.createTextNode(tema);
        emptyListNode.appendChild(textEmptyList);
        this.listOfSubjectsWithoutQuestions.appendChild(emptyListNode);
      });
    }
    this.amountOfSubjects.textContent = this.getSubjectsAmount();
    this.questionsAverage.innerText = `${(
      preguntas.length / this.getSubjectsAmount()
    ).toFixed(2)}`;
    this.temas.forEach((tema) => {
      let nodo = document.createElement("li");
      let texto = document.createTextNode(tema.nombre);
      nodo.appendChild(texto);
      this.listOfSubjects.appendChild(nodo);
    });
  }

  addNewSubject(nombre, descripción) {
    if (this.temas.find((tema) => tema.nombre === nombre)) {
      return { error: `EL_TEMA_${nombre.toUpperCase()}_YA_EXISTE` };
    }
    this.temas.push({ nombre: nombre, descripción: descripción });
    this.updateSection();
  }
}

class GestiónDePreguntas {
  constructor(preguntas) {
    this.listaDeTemasParaPreguntas = document.getElementById(
      "listaDeTemasParaPreguntas"
    );
    this.temasAElegir = document.getElementById("temasAElegir");
    this.cantidadDePreguntas = document.getElementById("cantidadDePreguntas");
    this.preguntas = !!preguntas ? preguntas : [];
  }

  initSection() {
    this.actualizarElementos();
  }

  agregarNuevaPregunta(
    tema,
    nivel,
    texto,
    respuestaCorrecta,
    respuestasIncorrectas
  ) {
    if (respuestasIncorrectas.includes(respuestaCorrecta)) return;
    this.preguntas.push({
      texto: texto,
      respuestaCorrecta: respuestaCorrecta,
      respuestasIncorrectas: respuestasIncorrectas,
      nivel: nivel,
      tema: gestiónDeTemas.getSubject(tema),
    });
    this.actualizarElementos();
  }

  actualizarElementos() {
    let tableDePreguntas = document.getElementById("tableDePreguntas");
    this.preguntas.sort((a, b) => {
      const nombreA = a.tema.nombre.toUpperCase();
      const nombreB = b.tema.nombre.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    this.preguntas.forEach((pregunta, index) => {
      let nuevaFila = tableDePreguntas.insertRow(-1);
      if (index % 2) nuevaFila.className = "Amarillo"
      let crearCeldaTema = nuevaFila.insertCell(0);
      let crearCeldaNivel = nuevaFila.insertCell(1);
      let crearCeldaTexto = nuevaFila.insertCell(2);
      let crearCeldaRespuestaCorrecta = nuevaFila.insertCell(3);
      let crearCeldaRespuestasIncorrectas = nuevaFila.insertCell(4);
      let crearTextoTema = document.createTextNode(pregunta.tema.nombre);
      let crearTextNivel = document.createTextNode(pregunta.nivel);
      let crearTextTexto = document.createTextNode(pregunta.texto);
      let crearTextRespuestaCorrecta = document.createTextNode(
        pregunta.respuestaCorrecta
      );
      let crearTextRespuestasIncorrectas = document.createTextNode(
        pregunta.respuestasIncorrectas
      );
      crearCeldaTema.appendChild(crearTextoTema);
      crearCeldaNivel.appendChild(crearTextNivel);
      crearCeldaTexto.appendChild(crearTextTexto);
      crearCeldaRespuestaCorrecta.appendChild(crearTextRespuestaCorrecta);
      crearCeldaRespuestasIncorrectas.appendChild(
        crearTextRespuestasIncorrectas
      );
    });
    this.cantidadDePreguntas.textContent = this.preguntas.length;
  }

  cargarListasDeTemas(temas) {
    temas.forEach((tema) => {
      let nodo = document.createElement("option");
      let texto = document.createTextNode(tema.nombre);
      nodo.appendChild(texto);
      temasAElegir.appendChild(nodo);
    });
    temas.forEach((tema) => {
      let nodo = document.createElement("option");
      let texto = document.createTextNode(tema.nombre);
      nodo.appendChild(texto);
      listaDeTemasParaPreguntas.appendChild(nodo);
    });
  }
}
