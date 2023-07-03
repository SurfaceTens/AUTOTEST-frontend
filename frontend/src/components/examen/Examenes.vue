<script>
import { mapState } from "pinia"
import { examenesStore } from "@/stores/examenesStore"
import Preguntas from "@/components/pregunta/Preguntas.vue"

export default {
  components: {
    Preguntas,
  },
  data() {
    return {
      verPreguntas: false,
      examenIDSeleccionado: null,
    }
  },
  computed: {
    ...mapState(examenesStore, ["examenes"]),
  },
  methods: {
    mostrarPreguntas(examenID) {
      this.examenIDSeleccionado = examenID
      this.verPreguntas = true
    },
    ocultarPreguntas() {
      this.verPreguntas = false
    },
  },
}
</script>

<template>
  <div>
    <div v-if="verPreguntas" class="container">
      <div class="card">
        <div class="card_content">
          <Preguntas
            :sonDeExamen="true"
            :examenID="this.examenIDSeleccionado"
            @cerrar="ocultarPreguntas"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <table class="listado-table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Aciertos</th>
            <th>Fallos</th>
            <th>No contestado</th>
            <th>Nota</th>
            <th>Acciones</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="examen in examenes" :key="examen.nombreExamen">
            <td v-if="examen.entregado">{{ examen.alumnoDatos }}</td>
            <td v-if="examen.entregado">{{ examen.aciertos }}</td>
            <td v-if="examen.entregado">{{ examen.fallos }}</td>
            <td v-if="examen.entregado">
              {{ examen.numPreguntas - (examen.aciertos + examen.fallos) }}
            </td>
            <td v-if="examen.entregado">{{ examen.nota }}</td>
            <td v-if="examen.entregado">
              <button class="btn btn-primary" @click="mostrarPreguntas(examen.id)">
                {{ examen.numPreguntas }} Preguntas
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
