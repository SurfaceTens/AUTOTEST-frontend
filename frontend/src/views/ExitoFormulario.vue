<script>
export default {
    name: 'ExitoFormulario',
    methods: {
    regresar() {
      this.$router.push('/');
    }
  }
};
</script>

<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Éxito</h2>
            </div>
            <div class="card-body">
                <div class="alert alert-success" role="alert">
                    La información ha sido enviada correctamente.
                </div>
                <div class="text-center">
                    <button class="btn btn-secondary btn-lg" @click="regresar">Volver</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
}

.card {
    border-radius: 8px;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.card-header {
    padding: 1rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
}

.card-body {
    padding: 2rem;
}

.alert {
    padding: 1rem;
    border-radius: 8px;
}
</style>