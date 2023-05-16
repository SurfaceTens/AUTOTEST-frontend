<script>
export default {
  name: 'Home',
};
</script>

<template>
  <div class="welcome-section">
    <div class="exam-section pregunta-card">
      <div class="exam-content card_header">
        <h1 class="card_title">Prepárate para tu examen de conducir</h1>
        <p class="card_description">Practica con nuestros exámenes aleatorios simulados basados en preguntas reales de la DGT.</p>
        <p></p>
        <router-link to="/examen" class="btn-start btn-examen">Comenzar el examen</router-link>
      </div>
    </div>
    <div class="create-questions-section pregunta-card">
      <div class="create-questions-content card_header">
        <h1 class="card_title">Crea tus propias preguntas</h1>
        <p class="card_description">Contribuye a nuestra comunidad de aprendizaje añadiendo tus preguntas y compartiéndolas con otros estudiantes.</p>
        <p></p>
        <router-link to="/nuevaPregunta" class="btn-start btn-crear">Crear preguntas</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-section {
  margin-top: 20px; /* Ajustado: separación superior */
  padding: 20px; /* Añadido: padding en lugar de margen */
  display: flex; /* Nuevo: utilizar flexbox */
  justify-content: space-between; /* Nuevo: separar contenedores en la horizontal */
}

.pregunta-card {
  background-color: var(--color-fondo);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: inline-block; /* Nuevo: utilizar inline-block */
  width: auto; /* Nuevo: ajustar al ancho del contenido */
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
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.btn-examen {
  background-color: #67c23a;
}

.btn-crear {
  background-color: #409eff;
}

@media (max-width: 768px) {
  .welcome-section {
    flex-direction: column; /* Nuevo: apilar contenedores en la vertical */
    align-items: center; /* Nuevo: centrar contenedores en la horizontal */
  }
}
</style>
