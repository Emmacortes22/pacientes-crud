<template>
    <div>
        <button @click="store.cargarPacientes" :disabled="store.loading">
            {{ store.loading ? 'Cargando...' : 'Cargar Pacientes' }}
        </button>
        <ul>
            <li v-for="p in store.pacientes" :key="p.id">
                {{ p.nombre }}
                <button @click="store.eliminarPaciente(p.id)">❌</button>
            </li>
        </ul>
        <div v-if="store.error" class="error">Error: {{ store.error.message }}</div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePacienteStore } from '../stores/pacienteStore'

const store = usePacienteStore()

onMounted(() => {
  store.cargarPacientes()
})
</script>