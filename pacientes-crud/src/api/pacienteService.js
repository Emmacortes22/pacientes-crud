import axios from './axios'

export async function getPacientes() {
    const res = await axios.get('/paciente')
    return res.data
}

export async function postPaciente(nombre) {
    const res = await axios.post('/paciente', { Nombre: nombre })
    return res.data
}

export async function deletePaciente(id) {
    const res = await axios.delete(`/paciente/${id}`)
    return res.data
}