import { defineStore } from 'pinia';
// Axios para la API.
import axios from 'axios';
// Quitar este import cuando se implemente la API.
import usuariosJson from '@/assets/usuarios.json';

const usuarios = usuariosJson._embedded.usuarios;

export const usuariosStore = defineStore('usuarios', {
    state: () => ({
        usuarios: usuarios,
    }),
    actions: {
        getUsuarioPorId(id) {
            return this.usuarios.find(usuario => usuario.nombreUsuario === id);
        },
        getUsuarios() {
            return this.usuarios;
        },

        // Reemplazar la ruta /api/usuarios por la ruta de verdad de la API cuando llegue el momento.

        // Conectar a la API para obtener los usuarios.
        getUsuariosFromAPI() {
            return axios
                .get('/api/usuarios')
                .then(response => {
                    this.usuarios = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener los usuarios:', error);
                });
        },
        // Conectar a la API para crear un nuevo usuario.
        crearUsuarioAPI(usuario) {
            return axios
                .post('/api/usuarios', usuario)
                .then(response => {
                    const nuevoUsuario = response.data;
                    this.usuarios.push(nuevoUsuario);
                })
                .catch(error => {
                    console.error('Error al crear el usuario:', error);
                });
        },
        // Conectar a la API para eliminar un usuario.
        eliminarUsuarioAPI(id) {
            return axios
                .delete(`/api/usuarios/${id}`)
                .then(() => {
                    this.usuarios = this.usuarios.filter(usuario => usuario.nombreUsuario !== id);
                })
                .catch(error => {
                    console.error('Error al eliminar el usuario:', error);
                });
        },
        // Conectar a la API para actualizar un usuario.
        actualizarUsuarioAPI(usuario) {
            return axios
                .put(`/api/usuarios/${usuario.nombreUsuario}`, usuario)
                .then(response => {
                    const usuarioActualizado = response.data;
                    const index = this.usuarios.findIndex(u => u.nombreUsuario === usuarioActualizado.nombreUsuario);
                    if (index !== -1) {
                        this.usuarios.splice(index, 1, usuarioActualizado);
                    }
                })
                .catch(error => {
                    console.error('Error al actualizar el usuario:', error);
                });
        },
    },
});
