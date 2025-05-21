import { describe, it, expect, vi, beforeEach } from "vitest"
import { usePacienteStore } from '../stores/pacienteStore'
import { setActivePinia, createPinia } from "pinia"
import * as pacienteService from '../api/pacienteService'

vi.mock('../api/pacienteService.js')

describe('pacienteStore (async)', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('carga pacientes correctamente', async () => {
        const store = usePacienteStore()
        const mockPacientes = [
            { id: 1, nombre: 'Emma' },
            { id: 2, nombre: 'Albert' }
        ]

        pacienteService.getPacientes.mockResolvedValue(mockPacientes)

        await store.cargarPacientes()

        expect(store.pacientes).toEqual(mockPacientes)
        expect(store.error).toBeNull()
        expect(store.loading).toBe(false)
    })

    it('maneja error al cargar pacientes', async () => {
        const store = usePacienteStore()
        const error = new Error('Error al cargar')

        pacienteService.getPacientes.mockRejectedValue(error)

        await store.cargarPacientes()

        expect(store.pacientes).toEqual([])
        expect(store.error).toEqual(error)
        expect(store.loading).toBe(false)
    })

    it('agrega un paciente correctamente', async () => {
        const store = usePacienteStore()
        const nuevoPaciente = { id: 123, nombre: 'Emma' }

        pacienteService.postPaciente.mockResolvedValue(nuevoPaciente)

        await store.agregarPaciente('Emma')

        expect(store.pacientes).toContainEqual(nuevoPaciente)
        expect(store.error).toBeNull()
    })

    it('maneja error al agregar paciente', async () => {
        const store = usePacienteStore()
        const error = new Error('Error al agregar')

        pacienteService.postPaciente.mockRejectedValue(error)

        await store.agregarPaciente('Error')

        expect(store.pacientes).toEqual([])
        expect(store.error).toEqual(error)
    })

    it('elimina un paciente correctamente', async () => {
        const store = usePacienteStore()
        store.pacientes = [
            { id: 1, nombre: 'Emma' },
            { id: 2, nombre: 'Albert' }
        ]

        pacienteService.deletePaciente.mockResolvedValue()

        await store.eliminarPaciente(1)

        expect(store.pacientes).toEqual([{ id: 2, nombre: 'Albert' }])
        expect(store.error).toBeNull()
    })

    it('maneja error al eliminar paciente', async () => {
        const store = usePacienteStore()
        store.pacientes = [{ id: 1, nombre: 'Emma' }]
        const error = new Error('Error al eliminar')

        pacienteService.deletePaciente.mockRejectedValue(error)

        await store.eliminarPaciente(1)

        // No se debe eliminar el paciente si falla
        expect(store.pacientes).toEqual([{ id: 1, nombre: 'Emma' }])
        expect(store.error).toEqual(error)
    })
})
