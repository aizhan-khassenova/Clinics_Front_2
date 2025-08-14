import { createRouter, createWebHistory } from "vue-router";
import ClinicsView from "@/views/Clinics/ClinicsView.vue";
import ClinicCreate from "@/views/Clinics/ClinicCreate.vue";
import ClinicUpdate from "@/views/Clinics/ClinicUpdate.vue";
import DoctorsView from "@/views/Doctors/DoctorsView.vue";
import DoctorCreate from "@/views/Doctors/DoctorCreate.vue";
import DoctorUpdate from '@/views/Doctors/DoctorUpdate.vue';

const routes = [
    { path: '/', redirect: '/clinics' },
    { path: '/clinics', name: 'clinics', component: ClinicsView },
    { path: '/clinics/create', name: 'clinicCreate', component: ClinicCreate },
    { path: '/clinics/:id/update', name: 'clinicUpdate', component: ClinicUpdate },
    { path: '/doctors', name: 'doctors', component: DoctorsView },
    { path: '/doctors/create', name: 'doctorCreate', component: DoctorCreate },
    { path: '/doctors/:id/update', name: 'doctorUpdate', component: DoctorUpdate },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;