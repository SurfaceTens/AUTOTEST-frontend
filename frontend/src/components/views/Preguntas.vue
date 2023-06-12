<script>
import { mapActions, mapState } from 'pinia';
import { loginStore } from '@/stores/loginStore';
import { preguntasStore } from '@/stores/preguntasStore';
import Pregunta from '@/components/Pregunta.vue';

export default {
  components: {
    Pregunta,
  },
  computed: {
    ...mapState(loginStore, ['isAdmin']),
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
  <div v-if="isAdmin">
    <h1>Listado de preguntas con Pinia</h1>
    <table class="listado-table">
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

  <div v-else>
    <h1>No se dispone de los permisos para visualizar el listado de preguntas</h1>
  </div>
</template>