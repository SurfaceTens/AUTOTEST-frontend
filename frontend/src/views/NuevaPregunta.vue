<script>
import { preguntasStore } from '@/stores/preguntasStore';

export default {
  data() {
    return {
      pregunta: {
        id: null,
        dificultad: '',
        tema: '',
        enunciado: '',
        correcta: '',
        incorrectas: [],
        imagen: null,
        incorrectasText: '',
      },
    };
  },
  methods: {
    submitForm() {
      const nuevaPregunta = { ...this.pregunta };
      nuevaPregunta.id = this.generarID();

      if (!nuevaPregunta.imagen) {
        nuevaPregunta.imagen = null;
      }

      const preguntasStore = this.$store.preguntasStore;

      // Llamar a la acción para crear una nueva pregunta en el store
      //preguntasStore.crearPreguntaAPI(nuevaPregunta)
      //.then(() => {
      // Realizar cualquier acción adicional después de crear la pregunta, como redirigir al usuario.
      // this.$router.push('/');
      //this.mostrarMensajeExito(); // Mostrar el mensaje emergente de éxito
      //})
      //.catch((error) => {
      // Manejar el error en caso de que la creación de la pregunta falle.
      //console.error(error);
      //});
    },

    generarID() {
      // Generar un ID único para la nueva pregunta (implementación personalizada)
      const timestamp = Date.now();
      const randomSuffix = Math.floor(Math.random() * 10000);
      return `${timestamp}_${randomSuffix}`;
    },

    subirImagen(event) {
      // Realizar las acciones necesarias para subir la imagen en el futuro
      const file = event.target.files[0];
      // Guardar la imagen en una ubicación específica y guardar la ruta en this.pregunta.imagen
      console.log(file);
    },
    mostrarMensajeExito() {
      this.$router.push('/exitoFormulario'); // Redirige al componente de éxito
    }
  },
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card_header">
        <h2 class="card_title">Crear una nueva pregunta</h2>
      </div>
      <div class="card_content">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="dificultad" class="form-label">Dificultad:</label>
            <div class="select-arrow">
              <select id="dificultad" class="form-control" v-model="pregunta.dificultad">
                <option value="" disabled selected>Selecciona la dificultad.</option>
                <option value="facil">Fácil</option>
                <option value="media">Media</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="tema" class="form-label">Tema:</label>
            <input type="text" id="tema" class="form-control" v-model="pregunta.tema"
              placeholder="Ingresa el tema de la pregunta." />
          </div>
          <div class="form-group">
            <label for="enunciado" class="form-label">Enunciado:</label>
            <textarea id="enunciado" class="form-control enunciado-textarea" v-model="pregunta.enunciado"
              placeholder="Introduce el enunciado de la pregunta"></textarea>
          </div>

          <div class="form-group">
            <label for="correcta" class="form-label">Respuesta correcta:</label>
            <input type="text" id="correcta" class="form-control" v-model="pregunta.correcta"
              placeholder="Ingresa la respuesta correcta." />
          </div>
          <div class="form-group">
            <label for="incorrecta1" class="form-label">Respuesta incorrecta 1:</label>
            <input type="text" id="incorrecta1" class="form-control" v-model="pregunta.incorrectas[0]"
              placeholder="Ingresa una respuesta incorrecta." />
          </div>
          <div class="form-group">
            <label for="incorrecta2" class="form-label">Respuesta incorrecta 2:</label>
            <input type="text" id="incorrecta2" class="form-control" v-model="pregunta.incorrectas[1]"
              placeholder="Ingresa una respuesta incorrecta." />
          </div>
          <div class="form-group">
            <label for="incorrecta3" class="form-label">Respuesta incorrecta 3:</label>
            <input type="text" id="incorrecta3" class="form-control" v-model="pregunta.incorrectas[2]"
              placeholder="Ingresa una respuesta incorrecta." />
          </div>
          <div class="form-group">
            <label for="imagen" class="form-label">Imagen:</label>
            <input type="file" id="imagen" class="form-control-file" @change="subirImagen" accept="image/*" />
          </div>
          <button type="submit" class="btn btn-primary" @click="mostrarMensajeExito">Guardar pregunta</button>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
.select-arrow::after {
  content: '↓';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.select-arrow {
  position: relative;
}


.container {
  max-width: var(--ancho-max-contenedor);
  margin: 0 auto;
  padding: 2rem;
}

.card {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
  background-color: var(--color-fondo);
}

.card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card_title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-borde);
}

.card_content {
  color: var(--color-borde);
  line-height: 1.5;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 600;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-borde);
  background-color: var(--color-secundario);
  border: 1px solid var(--color-borde);
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  color: var(--color-borde);
  background-color: var(--color-secundario);
  border-color: var(--color-primario);
  outline: 0;
  box-shadow: 0 0 0 2px rgba(57, 172, 57, 0.25);
}

.form-control-file {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-borde);
  background-color: var(--color-secundario);
  border: 1px solid var(--color-borde);
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.enunciado-textarea {
  height: 7.5rem;
  resize: none;
}


.btn-primary {
  border-radius: 8px;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--color-primario);
  color: var(--color-secundario);
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
}

.btn-primary:hover {
  background-color: darken(var(--color-primario), 10%);
}

.btn-primary:focus,
.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primario);
}
</style>
