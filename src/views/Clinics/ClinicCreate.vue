<template>
    <ClinicForm :isEdit="false" @save="submit" />
</template>

<script>
import axios from 'axios'
import ClinicForm from '@/views/Clinics/ClinicForm.vue'

export default {
    name: 'ClinicCreate',
    components: { ClinicForm },
    data() {
        return {
            form: { name: '', address: '' }
        }
    },
    methods: {
        async submit(data) {
            await axios.post('/api/clinics', data)
            this.$router.push('/clinics')
        }
    }
}
</script>