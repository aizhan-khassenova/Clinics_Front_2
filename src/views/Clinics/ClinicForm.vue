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

        <div v-if="alertMessage" class="alert mt-4" :class="`alert-${alertType}`" role="alert">
            {{ alertMessage }}
        </div>
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
            localForm: { name: '', address: '' },
            alertMessage: '',
            alertType: 'success'
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
                try {
                    await axios.put(`/api/clinics/${this.clinicId}`, this.localForm)
                    this.alertMessage = 'Клиника успешно обновлена!'
                    this.alertType = 'success'
                } catch (error) {
                    this.alertMessage = 'Ошибка при обновлении клиники'
                    this.alertType = 'danger'
                    console.error(error)
                }
            } else {
                try {
                    await axios.post('/api/clinics', this.localForm)
                    this.alertMessage = 'Клиника успешно добавлена!'
                    this.alertType = 'success'
                } catch (error) {
                    this.alertMessage = 'Ошибка при добавлении клиники'
                    this.alertType = 'danger'
                    console.error(error)
                }
            }

            setTimeout(() => {
                this.$router.push('/clinics')
            }, 3000)
        }
    }
}
</script>