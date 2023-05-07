<template>
  <div>
    <h1>Examen</h1>
    <div v-if="cargando">
      Cargando preguntas...
    </div>
    <div v-else>
      <div v-for="pregunta in preguntas" :key="pregunta.id">
        <h3>{{ pregunta.enunciado }}</h3>
        <ul>
          <li v-for="alternativa in pregunta.alternativasAleatorias" :key="alternativa">
            <label>
              <input type="checkbox" v-model="respuestas[pregunta.id]" :value="alternativa">
              {{ alternativa }}
            </label>
          </li>
        </ul>
      </div>
      <button @click="enviarExamen">Enviar</button>
      <div v-if="examenEnviado">
        puntuaje: {{ puntuaje }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useExamenStore } from '@/stores/examenStore';

export default defineComponent({
  name: 'Examen',
  setup() {
    const examenStore = useExamenStore();
    const cargando = ref(true);
    const preguntas = ref([]);
    const respuestas = ref({});
    const examenEnviado = ref(false);
    const puntuaje = ref(0);

    // Cargar preguntas desde la API o archivo JSON.
    const cargarPreguntas = async () => {
      try {
        // Descomentar el código siguiente para obtener las preguntas desde una API.
        // const response = await fetch('/api/preguntas');
        // preguntas.value = await response.json();

        // Comentar el código siguiente cuando se utilice la API.
        const response = await fetch('/assets/preguntas.json');
        preguntas.value = await response.json();
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
      } finally {
        cargando.value = false;
      }
    };

    const enviarExamen = () => {
      let puntuajeContador = 0;
      for (const idPregunta in respuestas.value) {
        const pregunta = preguntas.value.find((p) => p.id === parseInt(idPregunta));
        const respuestaSeleccionada = respuestas.value[idPregunta];
        if (pregunta && respuestaSeleccionada === pregunta.correcta) {
          puntuajeContador++;
        }
      }
      puntuaje.value = puntuajeContador;
      examenEnviado.value = true;
    };

    cargarPreguntas();

    return {
      cargando,
      preguntas,
      respuestas,
      examenEnviado,
      puntuaje,
      enviarExamen,
    };
  },
});
</script>
