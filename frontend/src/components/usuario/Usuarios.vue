<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { usuariosStore } from "@/stores/usuariosStore"

export default {
  computed: {
    ...mapState(loginStore, ["isAdmin"]),
    ...mapState(usuariosStore, ["usuarios"]),
  },
  methods: {
    ...mapActions(usuariosStore, ["getUsuarios"]),
  },
  created() {
    this.getUsuarios()
  },
}
</script>

<template>
  <div v-if="isAdmin">
    <table class="listado-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.nombreUsuario">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.apellidos }}</td>
          <td>
            <!-- Aquí se colocan los botones para cada acción -->
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else>
    <h1>No se dispone de los permisos para visualizar el listado de usuarios</h1>
  </div>
</template>
