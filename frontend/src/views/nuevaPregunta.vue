<script>

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
      // Acciones para guardar la pregunta
      console.log(this.pregunta);
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      // Realizar las acciones necesarias para subir la imagen en el futuro
      // Guardar la imagen en una ubicación específica y guardar la ruta en this.pregunta.imagen
      console.log(file);
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card_header">
        <h2 class="card_title">Formulario para dar de alta una pregunta</h2>
      </div>
      <div class="card_content">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="dificultad" class="form-label">Dificultad:</label>
            <select id="dificultad" class="form-control" v-model="pregunta.dificultad">
              <option value="facil">Fácil</option>
              <option value="media">Media</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>
          <div class="form-group">
            <label for="tema" class="form-label">Tema:</label>
            <input type="text" id="tema" class="form-control" v-model="pregunta.tema" />
          </div>
          <div class="form-group">
            <label for="enunciado" class="form-label">Enunciado:</label>
            <textarea id="enunciado" class="form-control" v-model="pregunta.enunciado"></textarea>
          </div>
          <div class="form-group">
            <label for="correcta" class="form-label">Respuesta correcta:</label>
            <input type="text" id="correcta" class="form-control" v-model="pregunta.correcta" />
          </div>
          <div class="form-group">
            <label for="incorrecta1" class="form-label">Respuesta incorrecta 1:</label>
            <input type="text" id="incorrecta1" class="form-control" v-model="pregunta.incorrectas[0]" />
          </div>
          <div class="form-group">
            <label for="incorrecta2" class="form-label">Respuesta incorrecta 2:</label>
            <input type="text" id="incorrecta2" class="form-control" v-model="pregunta.incorrectas[1]" />
          </div>
          <div class="form-group">
            <label for="incorrecta3" class="form-label">Respuesta incorrecta 3:</label>
            <input type="text" id="incorrecta3" class="form-control" v-model="pregunta.incorrectas[2]" />
          </div>
          <div class="form-group">
            <label for="imagen" class="form-label">Imagen:</label>
            <input type="file" id="imagen" class="form-control-file" @change="handleImageUpload" accept="image/*" />
          </div>
          <button type="submit" class="btn btn-primary">Guardar pregunta</button>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
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
