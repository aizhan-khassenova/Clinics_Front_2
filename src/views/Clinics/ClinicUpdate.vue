<template>
    <ClinicForm :isEdit="true" :form="form" @save="submit" />
</template>

<script>
import axios from 'axios'
import ClinicForm from '@/views/Clinics/ClinicForm.vue'

export default {
    name: 'ClinicUpdate',
    components: { ClinicForm },
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
        async submit(data) {
            try {
                await axios.put(`/api/clinics/${this.clinicId}`, data)
                this.$router.push('/clinics')
            } catch (error) {
                console.error('Ошибка при обновлении.', error)
            }
        }
    }
}
</script>