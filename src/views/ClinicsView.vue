<template>
    <div class="container mt-4">
        <h1 class="mb-4">Список клиник</h1>
        <table class="table table-bordered table-striped">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Адрес</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="clinic in clinics" :key="clinic.id">
                    <td>{{ clinic.id }}</td>
                    <td>{{ clinic.name }}</td>
                    <td>{{ clinic.address }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            clinics: []
        }
    },
    created() {
        this.fetchClinics();
    },
    methods: {
        async fetchClinics() {
            try {
                const response = await axios.get('/api/clinics');
                this.clinics = response.data
            } catch (error) {
                console.error('Ошибка при загрузке клиник: ', error);
            }
        }
    }
}
</script>