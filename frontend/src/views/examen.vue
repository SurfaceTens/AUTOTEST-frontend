<script>
import { mapActions, mapState } from 'pinia';
import { preguntasStore } from '@/stores/preguntasStore';
import pregunta from '@/views/pregunta.vue';

export default {
    components: {
        pregunta,
    },
    computed: {
        ...mapState(preguntasStore, ['preguntas']),
        pregunta() {
            return this.preguntas.find(p => p.id == this.$route.params.id);
        },
    },
    methods: {
        ...mapActions(preguntasStore, ['getPreguntaPorId']),
        ...mapActions(preguntasStore, ['getPreguntas'])
    },
    created() {
        this.getPreguntas();
    }
};
</script>

<template>
    <div>
        <h1>Examen con Pinia</h1>
        <ul>
            <li v-for="(pregunta) in preguntas" :key="id">
                <pregunta :pregunta="pregunta" />
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
}
</style>
