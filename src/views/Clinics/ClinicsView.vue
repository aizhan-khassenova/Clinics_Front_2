<template>
    <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="mb-0">Список клиник</h1>
            <RouterLink to="/clinics/create" class="btn btn-primary">Добавить</RouterLink>
        </div>

        <table class="table table-bordered table-striped">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Адрес</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="clinic in clinics" :key="clinic.id">
                    <td>{{ clinic.id }}</td>
                    <td>{{ clinic.name }}</td>
                    <td>{{ clinic.address }}</td>
                    <td class="d-flex flex-row">
                        <button class="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal"
                            data-bs-target="#listComponet" @click="openDoctors(clinic)">
                            <i class="bi bi-eye-fill"></i>
                        </button>
                        <RouterLink :to="`/clinics/${clinic.id}/update`" class="btn btn-sm btn-outline-primary me-2">
                            <i class="bi bi-pencil-fill"></i>
                        </RouterLink>
                        <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal"
                            data-bs-target="#deleteComponent" @click="openDeleteModal(clinic.id)">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <DeleteComponent @confirm="deleteClinic" />

        <ListComponent title="Врачи клиники:" :items="doctorsInClinic" primary-field="name"
            secondary-field="position" />

        <div v-if="alertMessage" class="alert position-fixed top-0 start-50 translate-middle-x mt-3"
            :class="`alert-${alertType}`" role="alert" style="z-index: 1055;">
            {{ alertMessage }}
        </div>
    </div>
</template>

<script>
import DeleteComponent from '@/components/modals/DeleteComponent.vue';
import ListComponent from '@/components/modals/ListComponent.vue'
import axios from 'axios';

export default {
    components: { DeleteComponent, ListComponent },
    data() {
        return {
            clinics: [],
            selectedClinicId: null,
            alertMessage: '',
            alertType: 'success',
            hideTimer: null,
            doctorsInClinic: []
        }
    },
    created() {
        this.fetchClinics();
    },
    beforeUnmount() {
        if (this.hideTimer) clearTimeout(this.hideTimer)
    },
    methods: {
        async fetchClinics() {
            try {
                const response = await axios.get('/api/clinics');
                this.clinics = response.data
            } catch (error) {
                console.error('Ошибка при загрузке клиник: ', error);
            }
        },
        async openDoctors(clinic) {
            this.doctorsInClinic = []
            try {
                const { data } = await axios.get(`/api/clinics/MultipleMapping/${clinic.id}`)
                this.doctorsInClinic = data?.doctors ?? []
            } catch (error) {
                console.error('Ошибка при загрузке врачей в клинике:', error);
            }
        },
        openDeleteModal(id) {
            this.selectedClinicId = id
        },
        showAlert(message, type = 'success') {
            this.alertType = type
            this.alertMessage = message
            if (this.hideTimer) clearTimeout(this.hideTimer)
            this.hideTimer = setTimeout(() => {
                this.alertMessage = ''
            }, 3000)
        },
        async deleteClinic() {
            const id = this.selectedClinicId;
            try {
                await axios.delete(`/api/clinics/${id}`);
                this.clinics = this.clinics.filter(clinic => clinic.id !== id)
                this.selectedClinicId = null;
                this.showAlert('Клиника успешно удалена!', 'success')
            } catch (error) {
                this.showAlert('Ошибка при удалении клиники', 'danger')
                console.error(error);
            }
        }
    }
}
</script>