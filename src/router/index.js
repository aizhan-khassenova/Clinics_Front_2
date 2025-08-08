import { createRouter, createWebHistory } from "vue-router";
import ClinicsView from "@/views/ClinicsView.vue";
import DoctorsView from "@/views/DoctorsView.vue";

const routes = [
    { path: '/', redirect: '/clinics' },
    { path: '/clinics', name: 'clinics', component: ClinicsView },
    { path: '/doctors', name: 'doctors', component: DoctorsView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;