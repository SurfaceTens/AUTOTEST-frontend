# AUTOTEST

**Descripción**

Proyecto que permitirá a los alumnos de una autoescuela realizar exámenes online. En principio, las pregutas estarán relacionadas con el temario de obtención del permiso de conducir B, aunque el sistema se diseñará para poder ser reutilizado en exámenes de otra temática, como por ejemplo, exámenes de oposiciones o exámenes de idiomas.

Se podrán dar de alta preguntas de diferente tipología y dificultad, que servirán como repositorio centralizado para el personal de la autoescuela. 
Posteriormente, los alumnos/usuarios del sistema podrán realizar exámenes, que se generarán con preguntas obtenidas de forma aleatoria.

Finalmente, se podrán obtener una serie de estadísticas, como qué pregunta es la más fallada o qué alumno es el que mejores resultados ha obtenido.

**Diagrama de Clases**

![Diagrama de Clases](https://git.institutomilitar.com/samotcarrasco/autoescuela-online/-/wikis/img/AutotestClases.png)

**Cumplimiento de requisitos**


**1. Herencia:** El supertipo `PreguntaTest` tendrá los subtipos `PreguntaConImagen` y `PreguntaConVideo`.

**2. Relación One-To-Many:** Relación muchos muchos entre `Examen` y `Pregunta`.

**3. Método personalizado:**` generarExamen()`. Este método generará un exámen con preguntas obtenidas de forma aleatoria en función del nivel de dificultad seleccionado, devolviendo una instancia de la entidad examen alimentada con una lista de 30 preguntas.

**4. Listado:** Se mostrará una lista de exámenes conocidos, pudiendo acceder a la lista de preguntas asociada a cada uno. Para cada examen interesa mostrar que alumno lo realizó y que respuestas dió, asi como la nota.

**5. CRUD:** Se podrá hacer CRUD de las entidades `Pregunta` en el front. Además también `Examen` y `Alumno` en el backend.

**6. URLs del proyecto:**

Repositorio proyecto: https://git.institutomilitar.com/samotcarrasco/autoescuela-online

Librería: https://github.com/SurfaceTens/backendAutotest-LIB


**7. Despliegue en Internet:**

API: https://autotestapi-serperdim45.b4a.run/api

Web: https://autotestdim.netlify.app/#/







