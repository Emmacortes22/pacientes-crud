<template>
    <form @submit.prevent="agregar">
        <input v-model="nombre" placeholder="Nombre del paciente" />
        <button type="submit">Agregar</button>
        <div v-if="error" class="error">Error: {{ error.message }}</div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { usePacienteStore } from '../stores/pacienteStore'

const nombre = ref('')
const store = usePacienteStore()
const error = store.error

async function agregar() {
    if (nombre.value.trim()) {
        await store.agregarPaciente(nombre.value)
        if (!store.error) {
        nombre.value = ''
        }
    }
}
</script>