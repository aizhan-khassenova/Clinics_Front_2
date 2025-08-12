<template>
    <div class="container mt-4" style="max-width: 720px;">
        <h1 class="mb-4">
            {{ isEdit ? 'Редактировать клинику' : 'Добавить клинику' }}
        </h1>

        <form @submit.prevent="submit">
            <div class="mb-3">
                <label class="form-label">Название</label>
                <input type="text" class="form-control" v-model.trim="localForm.name">
            </div>

            <div class="mb-3">
                <label class="form-label">Адрес</label>
                <textarea type="text" class="form-control" rows="2" v-model.trim="localForm.address"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
            <RouterLink to="/clinics" class="btn btn-link ms-2">Отмена</RouterLink>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ClinicForm',
    props: {
        isEdit: Boolean
    },
    data() {
        return {
            localForm: { name: '', address: '' }
        }
    },
    computed: {
        clinicId() {
            return this.$route.params.id
        }
    },
    async created() {
        if (this.isEdit) {
            await this.loadClinic()
        }
    },
    methods: {
        async loadClinic() {
            try {
                const { data } = await axios.get(`/api/clinics/${this.clinicId}`)
                this.localForm = { name: data?.name || '', address: data?.address || '' }
            } catch (error) {
                console.error('Ошибка при получении клиники', error)
            }
        },
        async submit() {
            if (this.isEdit) {
                await axios.put(`/api/clinics/${this.clinicId}`, this.localForm)
            } else {
                await axios.post('/api/clinics', this.localForm)
            }
            this.$router.push('/clinics')
        }
    }
}
</script>