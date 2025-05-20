import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as pacienteService from '../api/pacienteService'

export const usePacienteStore = defineStore('paciente', () => {
    const pacientes = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function cargarPacientes() {
        loading.value = true
        error.value = null

        try {
            const response = await pacienteService.getPacientes()
            pacientes.value = response
        } catch (err) {
            error.value = err
        } finally {
            loading.value = false
        }
    }

    async function agregarPaciente(nombre) {
        error.value = null

        try {
            const response = await pacienteService.postPaciente(nombre)
            pacientes.value.push(response)
        } catch (err) {
            error.value = err
        }
    }

    async function eliminarPaciente(id) {
        error.value = null

        try {
            await pacienteService.deletePaciente(id)
            pacientes.value = pacientes.value.filter(p => p.id !== id)
        } catch (err) {
            error.value = err
        }
    }

    return { pacientes, loading, error, cargarPacientes, agregarPaciente, eliminarPaciente }
})