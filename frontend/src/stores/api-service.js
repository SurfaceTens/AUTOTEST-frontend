import axios from "axios"

//const host = 'https://autotestapi-serperdim45.b4a.run/api'
const host = "http://localhost:8800/api"    // API local

export function cambiarHttpPorHttps(enlace) {
  return enlace.replace("http", "https")
}

export function llamadaApi(path, method, body) {
  return llamadaApiConConfiguracion(configuracionPorDefecto(path, method, body))
}

function llamadaApiConConfiguracion(config) {
  return axios.request(config)
}

function configuracionPorDefecto(path, method, body) {
  let config = {
    method: method ?? "get",
    maxBodyLength: Infinity,
    url: path,
    headers: {},
  }

  if (body) {
    ;(config.data = body), (config.headers["Content-Type"] = "application/json")
  }

  return config
}

export async function guardarPregunta(pregunta) {
  return llamadaApi(`${host}/preguntas`, "post", pregunta)
}

export async function eliminarPregunta(preguntaID) {
  return llamadaApi(`${host}/preguntas/${preguntaID}`, "delete")
}

export function borrarEntidad(entidad) {
  return llamadaApi(cambiarHttpPorHttps(entidad._links.self.href), "delete")
}

export function getEntidades(nombre) {
  return llamadaApi(`${host}/${nombre}`)
}

export function crearExamen(numPreguntas, usuarioID, nivelDificultad) {
  return llamadaApi(`${host}/preguntasExamen/generarExamen/${numPreguntas}/${usuarioID}/${nivelDificultad}`)
}

export function corregirPreguntaExamen(preguntaID,pregunta) {
  return llamadaApi(`${host}/preguntasExamen/${preguntaID}`,`put`,pregunta)
}

export function actualizarPregunta(preguntaID,pregunta) {
  return llamadaApi(`${host}/preguntas/${preguntaID}`,`put`,pregunta)
}

export function actualizarAlumno(alumnoID,alumno) {
  return llamadaApi(`${host}/preguntas/${alumnoID}`,`put`,alumno)
}

export function actualizarExamen(examenID,examen) {
  return llamadaApi(`${host}/examenes/${examenID}`,`put`,examen)
}