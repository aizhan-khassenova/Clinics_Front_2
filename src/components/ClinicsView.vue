<template>
    <div>
        <h1>Список клиник</h1>
        <ul>
            <li v-for="clinic in clinics" :key="clinic.id">
                <h3>{{ clinic.name }}</h3>
                <p>{{ clinic.address }}</p>
            </li>
        </ul>
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

<style scoped>
h1 {
    margin-bottom: 1rem;
}

li {
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
}
</style>