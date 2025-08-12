<template>
    <ClinicForm :isEdit="false" />
</template>

<script>
import ClinicForm from '@/views/Clinics/ClinicForm.vue'

export default {
    name: 'ClinicCreate',
    components: { ClinicForm }
}
</script>