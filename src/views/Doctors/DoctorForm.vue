<template>
    <div class="container mt-4" style="max-width: 720px;">
        <h1 class="mb-4">
            {{ isEdit ? 'Редактировать врача' : 'Добавить врача' }}
        </h1>

        <form @submit.prevent="submit">
            <div class="mb-3">
                <label class="form-label">ФИО</label>
                <input type="text" class="form-control" v-model.trim="localForm.name" />
            </div>

            <div class="mb-3">
                <label class="form-label">Должность</label>
                <input class="form-control" v-model.trim="localForm.position" />
            </div>

            <div class="mb-3">
                <label class="form-label">Клиника</label>
                <select class="form-select" v-model="localForm.clinic_id">
                    <option disabled :value="null">Выберите клинику</option>
                    <option v-for="clinic in clinics" :key="clinic.id" :value="clinic.id">
                        {{ clinic.name }}
                    </option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
            <RouterLink to="/doctors" class="btn btn-link ms-2">Отмена</RouterLink>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DoctorForm',
    props: {
        isEdit: Boolean
    },
    data() {
        return {
            localForm: { name: '', position: '', clinic_id: null },
            clinics: []
        }
    },
    computed: {
        doctorId() {
            return this.$route.params.id
        }
    },
    async created() {
        await this.loadClinics();
        if (this.isEdit) {
            await this.loadDoctor()
        }
    },
    methods: {
        async loadClinics() {
            const response = await axios.get('/api/clinics')
            this.clinics = response.data
        },
        async loadDoctor() {
            const { data } = await axios.get(`/api/doctors/${this.doctorId}`)
            this.localForm = { name: data.name || '', position: data.position || '', clinic_id: data.clinic_id || '' }
        },
        async submit() {
            if (this.isEdit) {
                await axios.put(`/api/doctors/${this.doctorId}`, this.localForm)
            } else {
                await axios.post('/api/doctors', this.localForm)
            }
            this.$router.push('/doctors')
        }
    }
}
</script>
