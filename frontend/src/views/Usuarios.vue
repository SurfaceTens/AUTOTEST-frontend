<script>
import { mapActions, mapState } from 'pinia';
import { usuariosStore } from '@/stores/usuariosStore';

export default {
  computed: {
    ...mapState(usuariosStore, ['usuarios']),
  },
  methods: {
    ...mapActions(usuariosStore, ['getUsuarios']),
  },
  created() {
    this.getUsuarios();
  },
};
</script>

<template>
  <div>
    <h1>Usuarios con Pinia</h1>
    <table class="usuarios-table">
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
</template>

<style scoped>
.usuarios-table {
  width: 100%;
  border-collapse: collapse;
}

.usuarios-table th,
.usuarios-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.usuarios-table th {
  background-color: #f1f1f1;
  font-weight: bold;
}

.usuarios-table tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
