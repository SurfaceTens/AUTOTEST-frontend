<script>
import { mapActions, mapState } from "pinia"
import { examenStore } from "@/stores/examenStore"
import { loginStore } from "@/stores/loginStore"
import Preguntas from "@/components/pregunta/Preguntas.vue"
import Cargando from "@/components/Cargando.vue"

export default {
  components: {
    Preguntas,
    Cargando,
  },
  data() {
    return {
      verPreguntas: false,
      examenIDSeleccionado: null,
      cargando: true, // Muestra el estado de carga cuando la api no esta lista.
    }
  },
  computed: {
    ...mapState(examenStore, ["examenes"]),
    ...mapState(loginStore, ["alumnoID", "rol"]),
    examenesFiltrados() {
      let retorno = []
      console.log("this.examenes",this.examenes)
      console.log(this.alumnoID, this.rol)
      if (this.rol === "administrador") {
        retorno =  this.examenes
      } else if (this.rol === "alumno") {
        retorno =  this.examenes.filter((examen) => examen.alumnoID === this.alumnoID)
        console.log(retorno)
      }
        return retorno
    },
  },
  methods: {
    ...mapActions(examenStore, ["cargarExamenes"]),
    mostrarPreguntas(examenID) {
      this.examenIDSeleccionado = examenID
      this.verPreguntas = true
    },
    ocultarPreguntas() {
      this.verPreguntas = false
    },
  },
  async created() {
    await this.cargarExamenes()
    this.cargando = false
  },
}
</script>

<template>
  <div>
    <Cargando v-if="cargando" />
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
          <tr v-for="examen in examenesFiltrados" :key="examen.nombreExamen">
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
