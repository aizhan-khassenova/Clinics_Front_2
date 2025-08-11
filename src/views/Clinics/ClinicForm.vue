<template>
    <div class="container mt-4" style="max-width: 720px;">
        <h1 class="mb-4">
            {{ isEdit ? 'Редактировать клинику' : 'Добавить клинику' }}
        </h1>

        <form @submit.prevent="submit">
            <div class="mb-3">
                <label class="form-label">Название</label>
                <input type="text" class="form-control" v-model.trim="localForm.name">
            </div>

            <div class="mb-3">
                <label class="form-label">Адрес</label>
                <textarea type="text" class="form-control" rows="2" v-model.trim="localForm.address"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
            <RouterLink to="/clinics" class="btn btn-link ms-2">Отмена</RouterLink>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ClinicForm',
    props: {
        isEdit: Boolean,
        form: Object
    },
    data() {
        return {
            localForm: { name: '', address: '' }
        }
    },
    watch: {
        form: {
            handler(newVal) {
                this.localForm = { name: newVal?.name || '', address: newVal?.address || '' }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        submit() {
            this.$emit('save', this.localForm)
        }
    }
}
</script>