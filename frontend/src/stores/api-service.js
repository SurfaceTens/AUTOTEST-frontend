import axios from 'axios'

// Poner la mia back4app
//const host = 'https://pruebaapi1-autotest.b4a.run/api' // No borrar hasta desplegar
const host = 'http://localhost:8800/api'

export function cambiarHttpPorHttps(enlace) {
  return enlace.replace('http', 'https')
}

export function llamadaApi(path, method, body) {
  return llamadaApiConConfiguracion(configuracionPorDefecto(path, method, body))
}

function llamadaApiConConfiguracion(config) {
  return axios.request(config)
}

function configuracionPorDefecto(path, method, body) {
  let config = {
    method: method ?? 'get',
    maxBodyLength: Infinity,
    url: path,
    headers: {}
  }

  if (body) {
    config.data = body,
    config.headers['Content-Type'] = 'application/json'
  }

  return config
}

export async function guardarPregunta(pregunta) {
  return llamadaApi(`${host}/preguntas`, 'post', pregunta)
}

export async function actualizarPregunta(pregunta) {
  const parche = []
  const camposActualizables = [ 'timestamp' ]
  for (const campo in pregunta) {
    if (camposActualizables.includes(campo)) {
      parche.push({
        op: 'replace',
        path: `/${campo}`,
        value: pregunta[campo]
      })
    }
  }

  const config = configuracionPorDefecto(cambiarHttpPorHttps(pregunta._links.self.href), 'patch', parche)

  config.headers['Content-Type'] = 'application/json-patch+json'

  return llamadaApiConConfiguracion(config).then(r => initRespuestaPregunta(r))

}

export function borrarEntidad(entidad) {
  return llamadaApi(cambiarHttpPorHttps(entidad._links.self.href), 'delete')
}

export function getEntidades(nombre) {
  return llamadaApi(`${host}/${nombre}`)
}

export function crearExamen(numPreguntas,usuarioID) {
  return llamadaApi(`${host}/preguntaExamen/generarExamen/${numPreguntas}/${usuarioID}`)
}