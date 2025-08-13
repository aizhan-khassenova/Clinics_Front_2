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
    </div>
</template>

<script>
import DeleteComponent from '@/components/modals/DeleteComponent.vue';
import axios from 'axios';

export default {
    components: { DeleteComponent },
    data() {
        return {
            clinics: [],
            selectedClinicId: null
        }
    },
    created() {
        this.fetchClinics();
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
        openDeleteModal(id) {
            this.selectedClinicId = id
        },
        async deleteClinic() {
            const id = this.selectedClinicId;
            try {
                await axios.delete(`/api/clinics/${id}`);
                this.clinics = this.clinics.filter(clinic => clinic.id !== id)
                this.selectedClinicId = null;
            } catch (error) {
                console.error('Ошибка при удалении клиники: ', error);
            }
        }
    }
}
</script>