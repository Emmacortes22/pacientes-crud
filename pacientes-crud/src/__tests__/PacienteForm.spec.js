import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PacienteForm from '../components/PacienteForm.vue'
import { usePacienteStore } from '../stores/pacienteStore'

// Mock del store
vi.mock('../stores/pacienteStore', () => {
    return {
        usePacienteStore: vi.fn()
    }
})

describe('PacienteForm.vue', () => {
    let agregarPacienteMock
    let storeMock

    beforeEach(() => {
        agregarPacienteMock = vi.fn()
        storeMock = {
        agregarPaciente: agregarPacienteMock,
        error: null
        }

        usePacienteStore.mockReturnValue(storeMock)
    })

    it('renderiza input y botón', () => {
        const wrapper = mount(PacienteForm)
        expect(wrapper.find('input').exists()).toBe(true)
        expect(wrapper.find('button').text()).toBe('Agregar')
    })

    it('permite escribir en el input', async () => {
        const wrapper = mount(PacienteForm)
        const input = wrapper.find('input')
        await input.setValue('Emma')
        expect(input.element.value).toBe('Emma')
    })

    it('llama a agregarPaciente con el nombre al enviar', async () => {
        const wrapper = mount(PacienteForm)
        const input = wrapper.find('input')
        await input.setValue('Emma')

        await wrapper.find('form').trigger('submit.prevent')

        expect(agregarPacienteMock).toHaveBeenCalledWith('Emma')
    })

    it('limpia el input si no hay error', async () => {
        const wrapper = mount(PacienteForm)
        const input = wrapper.find('input')
        await input.setValue('Emma')

        await wrapper.find('form').trigger('submit.prevent')

        // Simula que no hubo error
        expect(input.element.value).toBe('')
    })

    it('muestra mensaje de error si lo hay', () => {
        // Simula que el store devuelve un error
        storeMock.error = new Error('Algo salió mal')

        const wrapper = mount(PacienteForm)

        expect(wrapper.text()).toContain('Error: Algo salió mal')
    })
})
