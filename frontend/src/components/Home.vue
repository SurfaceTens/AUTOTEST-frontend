<script>
import { mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { examenStore } from "@/stores/examenStore"
import { preguntasStore } from "@/stores/preguntasStore"
import { alumnosStore } from "@/stores/alumnosStore"

export default {
  name: "Home",
  computed: {
    ...mapState(loginStore, ["rol", "alumnoDatos"]),
    ...mapState(examenStore, ["numExamenes"]),
    ...mapState(preguntasStore, ["numPreguntas"]),
    ...mapState(alumnosStore, ["numAlumnos"]),
  },
}
</script>

<template>
  <h1 v-if="rol === 'alumno' && alumnoDatos !== 'Alumno Invitado'" class="centrado">
    Hola {{ this.alumnoDatos }}
  </h1>
  <div v-if="rol !== 'administrador'" class="welcome-section">
    <div class="exam-section pregunta-card">
      <div class="exam-content card_header">
        <h1 class="card_title">Prepárate para tu examen de conducir</h1>
        <p class="card_description">
          Practica con nuestros exámenes aleatorios simulados basados en preguntas reales de la DGT.
        </p>
        <p></p>
        <router-link to="/examen" class="btn-start btn-examen">Comenzar el examen</router-link>
      </div>
    </div>
    <div class="create-questions-section pregunta-card">
      <div class="create-questions-content card_header">
        <h1 class="card_title">Crea tus propias preguntas</h1>
        <p class="card_description">
          Contribuye a nuestra comunidad de aprendizaje añadiendo tus preguntas y compartiéndolas
          con otros estudiantes.
        </p>
        <p></p>
        <router-link to="/nuevaPregunta" class="btn-start btn-alumnos">Crear preguntas</router-link>
      </div>
    </div>
  </div>

  <div v-else class="welcome-section">
    <div class="exam-section pregunta-card">
      <div class="exam-content card_header">
        <h1 class="card_title">Resumen de administración</h1>
        <ul>
          <li>Hay un total de {{ this.numExamenes }} examenes</li>
          <li>Hay un total de {{ this.numPreguntas }} preguntas</li>
          <li>Hay un total de {{ this.numAlumnos }} alumnos</li>
        </ul>
      </div>
    </div>

    <div class="create-questions-section pregunta-card">
      <div class="create-questions-content card_header">
        <h1 class="card_title">Acciones</h1>
        <p class="card_description">
          Accesos directos a las distintas funcionalidades administrativas.
        </p>
        <div class="welcome-section">
          <router-link to="/preguntas" class="btn-start btn-examen">Ver preguntas</router-link>
          <router-link to="/alumnos" class="btn-start btn-alumnos">Ver alumnos</router-link>
          <router-link to="/examenes" class="btn-start btn-examenes">Ver Examenes</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-section {
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pregunta-card {
  background-color: var(--color-fondo);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: inline-block;
  width: auto;
}

.card_header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card_title {
  margin: 0;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.card_description {
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
}

.btn-start {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  color: var(--color-secundario);
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.btn-examen {
  background-color: #67c23a;
}

.btn-alumnos {
  background-color: #409eff;
}

.btn-examenes {
  background-color: #ff4040;
}

.centrado {
  text-align: center;
  margin-top: var(--tamano-fuente-normal);
}

@media (max-width: 768px) {
  .welcome-section {
    flex-direction: column;
    align-items: center;
  }
}
</style>
