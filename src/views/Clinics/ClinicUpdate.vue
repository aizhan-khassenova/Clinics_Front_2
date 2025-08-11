<template>
    <div class="container mt-4" style="max-width: 720px;">
        <h1 class="mb-4">Редактировать клинику</h1>

        <form @submit.prevent="submit">
            <div class="mb-3">
                <label class="form-label">Название</label>
                <input type="text" class="form-control" v-model.trim="form.name">
            </div>

            <div class="mb-3">
                <label class="form-label">Адрес</label>
                <textarea type="text" class="form-control" rows="2" v-model.trim="form.address"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
            <RouterLink to="/clinics" class="btn btn-link ms-2">Отмена</RouterLink>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ClinicUpdate',
    data() {
        return {
            form: { name: '', address: '' }
        }
    },
    computed: {
        clinicId() {
            return this.$route.params.id
        }
    },
    async created() {
        await this.loadClinic()
    },
    methods: {
        async loadClinic() {
            try {
                const { data } = await axios.get(`/api/clinics/${this.clinicId}`)
                this.form = { name: data.name || '', address: data.address || '' }
            } catch (error) {
                console.error('Ошибка при загрузке данных клиники.', error)
            }
        },
        async submit() {
            try {
                await axios.put(`/api/clinics/${this.clinicId}`, this.form)
                this.$router.push('/clinics')
            } catch (error) {
                console.error('Ошибка при обновлении.', error)
            }
        }
    }
}
</script>