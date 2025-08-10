<template>
    <div class="container mt-4" style="max-width: 720px;">
        <h1 class="mb-4">Добавить клинику</h1>

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
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ClinicCreate',
    data() {
        return {
            form: { name: '', address: '' }
        }
    },
    methods: {
        async submit() {
            await axios.post('/api/clinics', this.form)
            this.$router.push('/clinics')
        }
    }
}
</script>