<script>
import { mapActions, mapState } from 'pinia';
import { preguntasStore } from '@/stores/preguntasStore';
import Pregunta from '@/components/Pregunta.vue';

export default {
    components: {
        Pregunta,
    },
    data() {
        return {
            numPreguntas: 10, // Numero de preguntas que debe tener el examen.
            examenTerminado: false, // Variable para controlar el estado del examen.
            respuestasExamen: [], // Array para almacenar las respuestas del examen.
            tituloExamen: `Examen aleatorio de 10 preguntas`, // Título inicial del examen.
        };
    },
    computed: {
        ...mapState(preguntasStore, ['preguntas']),
        preguntasTratadas() {
            return this.randomizarYLimitarPreguntas(this.preguntas, this.numPreguntas);
        },
        pregunta() {
            return this.preguntas.find((p) => p.id === this.$route.params.id);
        },
    },
    methods: {
        ...mapActions(preguntasStore, ['getPreguntas']),

        randomizarYLimitarPreguntas(preguntas, cantidad) {
            const totalPreguntas = preguntas.length;
            const cantidadFactible = Math.min(totalPreguntas, cantidad);
            const preguntasDesorden = this.desordenarElArray(preguntas);

            // Reiniciar respuestas de preguntas anteriores
            preguntasDesorden.forEach((pregunta) => {
                pregunta.respuesta = null;
            });

            return preguntasDesorden.slice(0, cantidadFactible);
        },

        desordenarElArray(array) {
            let indiceActual = array.length;
            let valorTemporal, numAleatorio;

            while (indiceActual !== 0) {
                numAleatorio = Math.floor(Math.random() * indiceActual);
                indiceActual--;

                valorTemporal = array[indiceActual];
                array[indiceActual] = array[numAleatorio];
                array[numAleatorio] = valorTemporal;
            }
            return array;
        },

        seleccionarOpcion(pregunta, opcion) {
            pregunta.respuesta = opcion;
        },

        guardarRespuestas() {
            this.respuestasExamen = this.preguntasTratadas.map((pregunta) => {
                return {
                    id: pregunta.id,
                    respuesta: pregunta.respuesta,
                };
            });
        },

        terminarExamen() {
            if (confirm('¿Estás seguro de que deseas terminar el examen?')) {
                this.guardarRespuestas();
                this.mostrarRespuestas();
                this.calcularPuntuacion();
                this.examenTerminado = true;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },

        mostrarRespuestas() {
            this.preguntasTratadas.forEach((pregunta) => {
                pregunta.respuestaCorrecta = pregunta.respuesta === pregunta.correcta;
                pregunta.respuestaIncorrecta = pregunta.respuesta && pregunta.respuesta !== pregunta.correcta;
            });
        },

        getRespuestaSeleccionada(preguntaId) {
            const respuesta = this.respuestasExamen.find(respuesta => respuesta.id === preguntaId);
            return respuesta ? respuesta.respuesta : '';
        },

        calcularPuntuacion() {
            let acertadas = 0;
            this.respuestasExamen.forEach((respuesta) => {
                const pregunta = this.preguntasTratadas.find((pregunta) => pregunta.id === respuesta.id);
                if (pregunta) {
                    if (respuesta.respuesta === pregunta.correcta) {
                        acertadas++;
                    }
                }
            });

            const totalPreguntas = this.preguntasTratadas.length;
            const porcentajeAciertos = (acertadas / totalPreguntas) * 100;
            let resultado;

            if (porcentajeAciertos >= 90) {
                resultado = "APTO";
            } else {
                resultado = "NO APTO";
            }

            this.tituloExamen = `Aciertos: ${acertadas} Resultado: ${resultado}`;
        },
        generarNuevoExamen() {
            this.preguntasTratadas = this.randomizarYLimitarPreguntas(this.preguntas, this.numPreguntas);
            this.respuestasExamen = [];
            this.tituloExamen = `Examen aleatorio de ${this.numPreguntas} preguntas`;
            this.examenTerminado = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

    },
    created() {
        this.getPreguntas();
    },
};
</script>

<template>
    <div class="area-examen">
        <!-- Versión resoluble del examen -->
        <div v-if="!examenTerminado">
            <h1>{{ tituloExamen }}</h1>
            <ul>
                <li v-for="(pregunta, index) in preguntasTratadas" :key="pregunta.id">
                    <Pregunta :pregunta="pregunta" :numero="index + 1" @opcionSeleccionada="seleccionarOpcion(pregunta, $event)"
                        :respuestaCorrecta="pregunta.respuestaCorrecta"
                        :respuestaIncorrecta="pregunta.respuestaIncorrecta" />
                    <b-button-group size="sm" vertical>
                        <b-button v-for="opcion in pregunta.opciones" :key="opcion.id"
                            @click="seleccionarOpcion(pregunta, opcion.id)" :class="{
                                'btn-primary': pregunta.respuesta === opcion.id,
                                'btn-outline-primary': pregunta.respuesta !== opcion.id,
                            }">
                            {{ opcion.texto }}
                        </b-button>
                    </b-button-group>
                </li>
            </ul>
            <div class="fin-examen">
                <button @click="terminarExamen" class="btn btn-primary btn-lg">Terminar</button>
            </div>
        </div>

        <!-- Versión del examen con respuestas resaltadas -->
        <div v-else>
            <h1>{{ tituloExamen }}</h1>
            <ul>
                <li v-for="(pregunta, index) in preguntasTratadas" :key="pregunta.id">
                    <Pregunta :pregunta="pregunta" :numero="index + 1" :desorden="false" :respuestaCorrecta="pregunta.correcta"
                        :respuestaSeleccionada="getRespuestaSeleccionada(pregunta.id)" />
                </li>

            </ul>
            <div class="fin-examen">
                <button @click="generarNuevoExamen" class="btn btn-secondary btn-lg">Hacer Otro</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.area-examen {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

ul {
    list-style: none;
}

.fin-examen {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
</style>
  