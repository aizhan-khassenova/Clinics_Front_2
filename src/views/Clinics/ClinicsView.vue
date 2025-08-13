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
                            data-bs-target="#exampleModal" @click="openDeleteModal(clinic.id)">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="deleteClinic()">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
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
            this.selectedClinicId = id; // сохраняем ID клиники
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