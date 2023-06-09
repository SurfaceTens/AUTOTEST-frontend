import axios from "axios"

const host = 'https://container-service-1.qhjvje6n3n75q.eu-west-3.cs.amazonlightsail.com/api'     //AWS
//const host = 'https://autotestapi-serperdim45.b4a.run/api'                                      /Back4App
//const host = 'http://localhost:8800/api'                                                        /Local

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

export async function borrarPregunta(preguntaID) {
  return llamadaApi(`${host}/preguntas/${preguntaID}`, "delete")
}

export function borrarEntidad(entidad) {
  return llamadaApi(cambiarHttpPorHttps(entidad._links.self.href), "delete")
}

export function getEntidades(nombre) {
  return llamadaApi(`${host}/${nombre}`)
}

export function getEntidad(nombre, id) {
  return llamadaApi(`${host}/${nombre}/${id}`)
}

export function getTotalEntidades(nombre) {
  return llamadaApi(`${host}/${nombre}/total`)
}

export async function getAlumnos() {
  const extraer = await getEntidades("alumnos")
  return extraer.data._embedded.alumnoModels
}

export async function getExamen(id) {
  const extraer = getEntidad("examenes", id)
  return extraer.data
}

export async function getExamenes() {
  const extraer = await getEntidades("examenes")
  return extraer.data._embedded.examenModels
}

export async function getPreguntas() {
  const extraer = await getEntidades("preguntas")
  return extraer.data._embedded.preguntaQuickModels
}

export async function crearExamen(numPreguntas, usuarioID, nivelDificultad) {
  const extraer = await llamadaApi(
    `${host}/preguntasExamen/generarExamen?numPreguntas=${numPreguntas}&idAlumno=${usuarioID}&dificultad=${nivelDificultad}`
  )
  return extraer.data._embedded.preguntaExamenModels
}

export function corregirPreguntaExamen(pregunta) {
  return llamadaApi(`${host}/preguntasExamen/${pregunta.id}`, `put`, pregunta)
}

export function actualizarPregunta(pregunta) {
  return llamadaApi(`${host}/preguntas/${pregunta.id}`, `put`, pregunta)
}

export function actualizarAlumno(alumno) {
  return llamadaApi(`${host}/preguntas/${alumno.id}`, `put`, alumno)
}

export function actualizarExamen(examen) {
  return llamadaApi(`${host}/examenes/${examen.id}`, `put`, examen)
}

export function getPreguntasExamen(examenID) {
  return llamadaApi(`${host}/examenes/${examenID}/preguntas`)
}
