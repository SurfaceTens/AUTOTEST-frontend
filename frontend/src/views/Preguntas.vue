<script>
import { mapActions, mapState } from 'pinia';
import { preguntasStore } from '@/stores/preguntasStore';
import Pregunta from '@/views/Pregunta.vue';

export default {
  components: {
    Pregunta,
  },
  computed: {
    ...mapState(preguntasStore, ['preguntas']),
    pregunta() {
      return this.preguntas.find(p => p.id == this.$route.params.id);
    },
  },
  methods: {
    ...mapActions(preguntasStore, ['getPreguntaPorId']),
    ...mapActions(preguntasStore, ['getPreguntas']),
    ordenarPreguntas() {
      this.preguntas.sort((a, b) => a.id - b.id);
    }
  },
  created() {
    this.getPreguntas();
    this.ordenarPreguntas();
  }
};
</script>

<template>
  <div>
    <h1>Preguntas con Pinia</h1>
    <table class="preguntas-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Enunciado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pregunta in preguntas" :key="pregunta.id">
          <td>{{ pregunta.id }}</td>
          <td>{{ pregunta.enunciado }}</td>
          <td>
            <!-- Aquí se colocan los botones para cada acción -->
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
.preguntas-table {
  width: 100%;
  border-collapse: collapse;
}

.preguntas-table th,
.preguntas-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.preguntas-table th {
  background-color: #f1f1f1;
  font-weight: bold;
}

.preguntas-table tbody tr:hover {
  background-color: #f9f9f9;
}
</style>

