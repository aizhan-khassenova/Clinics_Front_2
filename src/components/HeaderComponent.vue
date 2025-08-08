<template>
    <header class="bg-dark text-white py-3">
        <div class="container d-flex justify-content-between align-items-center">
            <h1 class="h4 mb-0">Клиники Караганды</h1>
            <nav>
                <RouterLink class="text-white me-3" to="/">Главная</RouterLink>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent'
}
</script>