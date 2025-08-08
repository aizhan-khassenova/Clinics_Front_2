<template>
    <div class="container mt-4">
        <h1 class="mb-4">Список врачей</h1>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <table class="table table-bordered table-striped" v-if="doctors.length">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Должность</th>
                    <th>Клиника (ID)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in doctors" :key="d.id">
                    <td>{{ d.id }}</td>
                    <td>{{ d.name }}</td>
                    <td>{{ d.position }}</td>
                    <td>{{ d.clinic_id }}</td>
                </tr>
            </tbody>
        </table>

        <div v-else class="text-muted">Нет данных</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DoctorsView',
    data() {
        return {
            doctors: [],
            error: null
        }
    },
    async created() {
        try {
            const { data } = await axios.get('/api/doctors')
            this.doctors = data
        } catch (e) {
            this.error = 'Ошибка при загрузке врачей'
            console.error(e)
        }
    }
}
</script>
