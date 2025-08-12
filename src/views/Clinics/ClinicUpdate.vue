<template>
    <ClinicForm :isEdit="true" />
</template>

<script>
import ClinicForm from '@/views/Clinics/ClinicForm.vue'

export default {
    name: 'ClinicUpdate',
    components: { ClinicForm }
}
</script>