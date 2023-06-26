<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
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
    ...mapState(loginStore, ["isAdmin"]),
    ...mapState(examenesStore, ["examenes"]),
  },
  methods: {
    ...mapActions(examenesStore, ["getExamenes"]),
    mostrarPreguntas(examenID) {
      this.examenIDSeleccionado = examenID
      this.verPreguntas = true
    },
    ocultarPreguntas() {
      this.verPreguntas = false
    },
  },
  created() {
    this.getExamenes()
  },
}
</script>

<template>
  <div v-if="isAdmin">
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
            <td v-if="examen.entregado ">{{ examen.alumnoDatos }}</td>
            <td v-if="examen.entregado ">{{ examen.aciertos }}</td>
            <td v-if="examen.entregado ">{{ examen.fallos }}</td>
            <td v-if="examen.entregado ">{{ examen.numPreguntas - (examen.aciertos + examen.fallos) }}</td>
            <td v-if="examen.entregado ">{{ examen.nota }}</td>
            <td v-if="examen.entregado ">
              <button class="btn btn-primary" @click="mostrarPreguntas(examen.id)">
                {{examen.numPreguntas}} Preguntas
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else>
    <h1>No se dispone de los permisos para visualizar el listado de examenes</h1>
  </div>
</template>
