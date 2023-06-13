<script>
export default {
  data() {
    return {
      alumno: {
        nombreUsuario: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
        nombre: "",
        apellidos: "",
        fechaNacimiento: "",
        direccion: {
          calle: "",
          numero: "",
          portal: "",
          piso: "",
          letra: "",
          codigoPostal: "",
          provincia: "",
          pais: "",
        },
      },
    }
  },
  methods: {
    submitForm() {
      const nuevoAlumno = { ...this.alumno }
      nuevoAlumno.id = this.generarID()

      // Llamar a la acción para crear un nuevo alumno en el store
      // this.$store.alumnosStore.crearAlumnoAPI(nuevoAlumno)
      //   .then(() => {
      //     // Realizar cualquier acción adicional después de crear el alumno, como redirigir al usuario.
      //     // this.$router.push('/');
      //     // this.mostrarMensajeExito(); // Mostrar el mensaje emergente de éxito
      //   })
      //   .catch((error) => {
      //     // Manejar el error en caso de que la creación del alumno falle.
      //     console.error(error);
      //   });
    },

    generarID() {
      // Generar un ID único para el nuevo alumno (implementación personalizada)
      const timestamp = Date.now()
      const randomSuffix = Math.floor(Math.random() * 10000)
      return `${timestamp}_${randomSuffix}`
    },

    mostrarMensajeExito() {
      this.$router.push("/exitoFormulario") // Redirige al componente de éxito
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card_header">
        <h2 class="card_title">Crear un nuevo alumno</h2>
      </div>
      <div class="card_content">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="nombreUsuario" class="form-label">Nombre de usuario:</label>
            <input
              type="text"
              id="nombreUsuario"
              class="form-control"
              v-model="alumno.nombreUsuario"
              placeholder="Ingresa el nombre de usuario"
            />
          </div>
          <div class="form-group">
            <label for="correo" class="form-label">Correo:</label>
            <input
              type="email"
              id="correo"
              class="form-control"
              v-model="alumno.correo"
              placeholder="Ingresa el correo electrónico"
            />
          </div>
          <div class="form-group">
            <label for="contrasena" class="form-label">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              class="form-control"
              v-model="alumno.contrasena"
              placeholder="Ingresa la contraseña"
            />
          </div>
          <div class="form-group">
            <label for="confirmarContrasena" class="form-label">Confirmar contraseña:</label>
            <input
              type="password"
              id="confirmarContrasena"
              class="form-control"
              v-model="alumno.confirmarContrasena"
              placeholder="Confirma la contraseña"
            />
          </div>
          <div class="form-group">
            <label for="nombre" class="form-label">Nombre:</label>
            <input
              type="text"
              id="nombre"
              class="form-control"
              v-model="alumno.nombre"
              placeholder="Ingresa el nombre"
            />
          </div>
          <div class="form-group">
            <label for="apellidos" class="form-label">Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              class="form-control"
              v-model="alumno.apellidos"
              placeholder="Ingresa los apellidos"
            />
          </div>
          <div class="form-group">
            <label for="fechaNacimiento" class="form-label">Fecha de nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              class="form-control"
              v-model="alumno.fechaNacimiento"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Dirección:</label>
            <input
              type="text"
              class="form-control"
              v-model="alumno.direccion.calle"
              placeholder="Calle"
            />
            <input
              type="text"
              class="form-control"
              v-model="alumno.direccion.numero"
              placeholder="Número"
            />
            <input
              type="text"
              class="form-control"
              v-model="alumno.direccion.portal"
              placeholder="Portal"
            />
            <input
              type="text"
              class="form-control"
              v-model="alumno.direccion.piso"
              placeholder="Piso"
            />
            <input
              type="text"
              class="form-control"
              v-model="alumno.direccion.letra"
              placeholder="Letra"
            />
            <input
              type="text"
              class="form-control"
              v-model="alumno.direccion.codigoPostal"
              placeholder="Código Postal"
            />
            <input
              type="text"
              class="form-control"
              v-model="alumno.direccion.provincia"
              placeholder="Provincia"
            />
            <input
              type="text"
              class="form-control"
              v-model="alumno.direccion.pais"
              placeholder="País"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary" @click="mostrarMensajeExito">
              Crear Alumno
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
