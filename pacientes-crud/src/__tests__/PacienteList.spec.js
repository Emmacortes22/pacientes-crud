import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PacienteList from '../components/PacienteList.vue'
import { usePacienteStore } from '../stores/pacienteStore'

// Mock del store
vi.mock('../stores/pacienteStore', () => {
    return {
        usePacienteStore: vi.fn()
    }
})

describe('PacienteList.vue', () => {
    let cargarPacientesMock
    let eliminarPacienteMock
    let storeMock

    beforeEach(() => {
        cargarPacientesMock = vi.fn()
        eliminarPacienteMock = vi.fn()
        storeMock = {
            pacientes: [],
            loading: false,
            error: null,
            cargarPacientes: cargarPacientesMock,
            eliminarPaciente: eliminarPacienteMock
        }

        usePacienteStore.mockReturnValue(storeMock)
    })

    it('renderiza el botón de cargar pacientes', () => {
        const wrapper = mount(PacienteList)
        expect(wrapper.find('button').text()).toBe('Cargar Pacientes')
    })

    it('muestra "Cargando..." cuando está en estado de carga', async () => {
        storeMock.loading = true
        const wrapper = mount(PacienteList)
        expect(wrapper.find('button').text()).toBe('Cargando...')
        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('llama a cargarPacientes al montar el componente', () => {
        mount(PacienteList)
        expect(cargarPacientesMock).toHaveBeenCalled()
    })

    it('llama a cargarPacientes al hacer click en el botón', async () => {
        const wrapper = mount(PacienteList)
        await wrapper.find('button').trigger('click')
        expect(cargarPacientesMock).toHaveBeenCalled()
    })

    it('renderiza la lista de pacientes correctamente', () => {
        storeMock.pacientes = [
            { id: 1, nombre: 'Emma' },
            { id: 2, nombre: 'Albert' }
        ]
        const wrapper = mount(PacienteList)
        const items = wrapper.findAll('li')
        expect(items).toHaveLength(2)
        expect(items[0].text()).toContain('Emma')
        expect(items[1].text()).toContain('Albert')
    })

    it('llama a eliminarPaciente al hacer click en el botón de eliminar', async () => {
        storeMock.pacientes = [{ id: 1, nombre: 'Emma' }]
        const wrapper = mount(PacienteList)
        await wrapper.find('li button').trigger('click')
        expect(eliminarPacienteMock).toHaveBeenCalledWith(1)
    })

    it('muestra mensaje de error cuando hay un error', () => {
        storeMock.error = new Error('Error al cargar pacientes')
        const wrapper = mount(PacienteList)
        expect(wrapper.find('.error').text()).toContain('Error: Error al cargar pacientes')
    })

    it('no muestra mensaje de error cuando no hay error', () => {
        const wrapper = mount(PacienteList)
        expect(wrapper.find('.error').exists()).toBe(false)
    })
})
