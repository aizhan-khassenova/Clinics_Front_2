<template>
    <div class="container mt-4" style="max-width: 720px;">
        <h1 class="mb-4">Добавить врача</h1>

        <form @submit.prevent="submit">
            <div class="mb-3">
                <label class="form-label">ФИО</label>
                <input type="text" class="form-control" v-model.trim="form.name">
            </div>

            <div class="mb-3">
                <label class="form-label">Должность</label>
                <input type="text" class="form-control" rows="2" v-model.trim="form.position">
            </div>

            <div class="mb-3">
                <label class="form-label">Клиника</label>
                <select class="form-select" v-model="form.clinic_id">
                    <option disabled value="">Выберите клинику</option>
                    <option v-for="clinic in clinics" :key="clinic.id" :value="clinic.id">
                        {{ clinic.name }}
                    </option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DoctorCreate',
    data() {
        return {
            form: { name: '', position: '', clinic_id: '' },
            clinics: []
        }
    },
    async created() {
        await this.fetchClinics()
    },
    methods: {
        async fetchClinics() {
            const response = await axios.get('/api/clinics');
            this.clinics = response.data
        },
        async submit() {
            await axios.post('/api/doctors', this.form)
            this.$router.push('/doctors')
        }
    }
}
</script>