# AUTOTEST

**Descripción**
Proyecto que permitirá a los alumnos de una autoescuela realizar exámenes online. En principio, las pregutas estarán relacionadas con el temario de obtención del permiso de conducir B, aunque el sistema estará preparado para poder ser reutilizado en exámenes de otra temática, como por ejemplo, exámenes de oposiciones.

Se podrán dar de alta preguntas de diferente tipología y dificultad. 
Posteriormente, los alumnos/usuarios del sistema podrán realizar exámenes, que se generarán con preguntas obtenidas de forma aleatoria.

Finalmente, se podrán obtener una serie de estadísticas, como qué pregunta es la más fallada o qué alumno es el que mejores resultados ha obtenido.

**Diagrama de Clases**

file:///home/samot/Im%C3%A1genes/Capturas%20de%20pantalla/Captura%20desde%202023-02-19%2022-27-26.png


**Cumplimiento de requisitos**


**Herencia:** El supertipo Pregunta tendrá los subtipos PreguntaConImagen y PreguntaConAudio.

**Relación One-To-Many: **Relación entre Pregunta y Exámen.

**Método personalizado: **generarExamen(). Este método generará un exámen con preguntas obtenidas de forma aleatoria en función del nivel de dificultad seleccionado.

**Listado:** Se mostrarán todas las preguntas existentes, junto con la dificultad teórica. pudiendo ser modificadas o eliminadas. También es deseable que se muestre la dificultad "real" es decir, tasa de acierto que ha tenido la pregunta.

**CRUD:** El CRUD se materializará en la clase Pregunta.

**URLs del proyecto:**

Repositorio proyecto: https://git.institutomilitar.com/samotcarrasco/autoescuela-online

Librería: https://github.com/... (pendiente)


**Despliegue en Internet:**

API: pendiente

Web: pendiente







