# AUTOTEST

**Descripción**
Proyecto que permitirá a los alumnos de una autoescuela realizar exámenes online. En principio, las pregutas estarán relacionadas con el temario de obtención del permiso de conducir B, aunque el sistema estará preparado para poder ser reutilizado en exámenes de otra temática, como por ejemplo, exámenes de oposiciones.

Se podrán dar de alta preguntas de diferente tipología y dificultad. 
Posteriormente, los alumnos/usuarios del sistema podrán realizar exámenes, que se generarán con preguntas obtenidas de forma aleatoria.

Finalmente, se podrán obtener una serie de estadísticas, como qué pregunta es la más fallada o qué alumno es el que mejores resultados ha obtenido.

**Diagrama de Clases**

[](https://minisdefeet-my.sharepoint.com/:i:/g/personal/acing_alu45_siycd_carrasco_minisdefeet_onmicrosoft_com/EW726kLdGhRHpW4lmszNL-UBOgu7gDfBovtOiSzbrIwWXQ?e=cczTWl)


**Cumplimiento de requisitos**


**1. Herencia:** El supertipo Pregunta tendrá los subtipos PreguntaConImagen y PreguntaConAudio.

**2. Relación One-To-Many: **Relación entre Pregunta y Exámen.

**3. Método personalizado: **generarExamen(). Este método generará un exámen con preguntas obtenidas de forma aleatoria en función del nivel de dificultad seleccionado. El exámen se podrá realizar y se mostrará la nota al finalizar.

**4. Listado:** Se mostrarán todas las preguntas existentes, junto con la dificultad teórica. pudiendo ser modificadas o eliminadas. También es deseable que se muestre la dificultad "real" es decir, tasa de acierto que ha tenido la pregunta.

**5. CRUD:** El CRUD se materializará en la clase Pregunta.

**6. URLs del proyecto:**

Repositorio proyecto: https://git.institutomilitar.com/samotcarrasco/autoescuela-online

Librería: https://github.com/... (pendiente)


**7. Despliegue en Internet:**

API: pendiente

Web: pendiente







