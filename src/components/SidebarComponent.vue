<template>
    <aside class="vorder-end bg-light h-100">
        <div class="p-3">
            <h6 class="text-uppercase text-muted mb-3">Меню</h6>
            <div class="list-group">
                <RouterLink to="/clinics" class="list-group-item list-group-item-action" active-class="active">
                    Клиники
                </RouterLink>
                <RouterLink to="/doctors" class="list-group-item list-group-item-action" active-class="active">
                    Врачи
                </RouterLink>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'SidebarComponent'
}
</script>

<style scoped>
aside {
    min-width: 240px;
}
</style>