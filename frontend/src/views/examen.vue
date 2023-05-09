<script>
import { mapActions, mapState } from 'pinia';
import { preguntasStore } from '@/stores/preguntasStore';
import pregunta from '@/views/pregunta.vue';

export default {
    components: {
        pregunta,
    },
    data() {
        return {
            numPreguntas: 30, // Numero de preguntas que debe tener el examen.
        };
    },
    computed: {
        ...mapState(preguntasStore, ['preguntas']),
        preguntasTratadas() {
            return this.randomizarYLimitarPreguntas(this.preguntas, this.numPreguntas);
        },
        pregunta() {
            return this.preguntas.find(p => p.id == this.$route.params.id);
        },
    },
    methods: {
        ...mapActions(preguntasStore, ['getPreguntas']),

        randomizarYLimitarPreguntas(preguntas, cantidad) {
            const totalPreguntas = preguntas.length;
            const cantidadFactible = Math.min(totalPreguntas, cantidad);
            const preguntasDesorden = this.desordenarElArray(preguntas);
            return preguntasDesorden.slice(0, cantidadFactible);
        },

        desordenarElArray(array) {
            // Algoritmo de Fisher-Yates para desordenar el array    
            // Obtener la longitud del array y crear un valor temporal.
            let indiceActual = array.length;
            let valorTemporal, numAleatorio;

            // Mientras no se hayan recorrido todos los elementos del array:
            while (indiceActual !== 0) {
                // Generar un índice aleatorio entre 0 y el actual.
                numAleatorio = Math.floor(Math.random() * indiceActual);
                indiceActual--;

                // Intercambiar el contenido de ambos indices.
                valorTemporal = array[indiceActual];
                array[indiceActual] = array[numAleatorio];
                array[numAleatorio] = valorTemporal;
            }
            return array;
        }
    },
    created() {
        this.getPreguntas();
    }
};
</script>

<template>
    <div>
        <h1>Examen aleatorio de {{ numPreguntas }} preguntas</h1>
        <ul>
            <li v-for="(pregunta) in preguntasTratadas" :key="id">
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
